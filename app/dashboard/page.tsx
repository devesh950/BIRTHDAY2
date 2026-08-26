import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db/client'
import Link from 'next/link'
import styles from './dashboard.module.css'
import { OCCASION_META } from '@/lib/constants'
import { OccasionType } from '@/schemas/experience'

export const metadata = {
  title: 'Dashboard',
  description: 'Manage your Memoire experiences',
}

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id

  const [experiences, orders] = await Promise.all([
    prisma.experience.findMany({
      where: userId ? { userId, deletedAt: null } : { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
    prisma.order.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  const stats = {
    total: experiences.length,
    published: experiences.filter((e: any) => e.status === 'PUBLISHED').length,
    drafts: experiences.filter((e: any) => e.status === 'DRAFT').length,
    totalViews: experiences.reduce((sum: number, e: any) => sum + e.viewCount, 0),
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <span className={styles.sidebarLogoIcon}>✦</span>
          <span>Memoire</span>
        </Link>

        <nav className={styles.sidebarNav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.navItemActive}`}>
            🏠 Overview
          </Link>
          <Link href="/dashboard/experiences" className={styles.navItem}>
            ✨ My Experiences
          </Link>
          <Link href="/create" className={styles.navItem}>
            ＋ Create New
          </Link>
          <Link href="/dashboard/orders" className={styles.navItem}>
            💳 Orders
          </Link>
          <Link href="/dashboard/account" className={styles.navItem}>
            👤 Account
          </Link>
        </nav>

        <form action="/api/auth/signout" method="POST" className={styles.sidebarFooter}>
          <button type="submit" className={styles.signoutBtn}>← Sign out</button>
        </form>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.mainHeader}>
          <div>
            <h1 className={styles.greeting}>
              Good morning{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''} ✨
            </h1>
            <p className={styles.greetingSubtitle}>Here&apos;s everything you&apos;ve created</p>
          </div>
          <Link href="/create" className="btn btn-primary">
            ✨ Create New
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {[
            { label: 'Total Experiences', value: stats.total, icon: '🎁', color: '#7C3AED' },
            { label: 'Published', value: stats.published, icon: '🌐', color: '#10B981' },
            { label: 'Drafts', value: stats.drafts, icon: '📝', color: '#F59E0B' },
            { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: '👁️', color: '#3B82F6' },
          ].map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
              <div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Experiences</h2>
            <Link href="/create" className="btn btn-secondary btn-sm">+ Create New</Link>
          </div>

          {experiences.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎁</div>
              <h3 className={styles.emptyTitle}>No experiences yet</h3>
              <p className={styles.emptyDesc}>Create your first personalized experience for someone special.</p>
              <Link href="/create" className="btn btn-primary">✨ Create My First Experience</Link>
            </div>
          ) : (
            <div className={styles.experiencesGrid}>
              {experiences.map((exp: any) => {
                const meta = OCCASION_META[exp.occasion as OccasionType]
                return (
                  <div key={exp.id} className={styles.expCard}>
                    <div className={styles.expPreview} style={{ background: meta.gradient }}>
                      <span className={styles.expEmoji}>{meta.emoji}</span>
                      <span className={`${styles.expStatus} ${styles[`status-${exp.status.toLowerCase()}`]}`}>
                        {exp.status === 'PUBLISHED' ? '🟢 Live' : '📝 Draft'}
                      </span>
                    </div>
                    <div className={styles.expInfo}>
                      <div className={styles.expMeta}>
                        <span className="badge badge-neutral">{meta.label}</span>
                        <span className={styles.expViews}>👁 {exp.viewCount}</span>
                      </div>
                      <h3 className={styles.expTitle}>{exp.title}</h3>
                      <p className={styles.expDate}>
                        {new Date(exp.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <div className={styles.expActions}>
                        <Link href={`/editor/${exp.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                        {exp.status === 'PUBLISHED' && (
                          <Link href={`/e/${exp.slug}`} className="btn btn-ghost btn-sm" target="_blank">View Live ↗</Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Orders</h2>
            </div>
            <div className={styles.ordersTable}>
              <div className={styles.ordersHeader}>
                <span>Order</span>
                <span>Plan</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {orders.map((order: any) => (
                <div key={order.id} className={styles.orderRow}>
                  <span className={styles.orderNum}>{order.orderNumber}</span>
                  <span className="badge badge-neutral">{order.plan}</span>
                  <span>₹{(order.amountPaise / 100).toLocaleString()}</span>
                  <span className={`badge ${order.status === 'PAID' ? 'badge-success' : order.status === 'FAILED' ? 'badge-error' : 'badge-warning'}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

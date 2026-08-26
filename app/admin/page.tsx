import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db/client'
import Link from 'next/link'
import styles from './admin.module.css'

export const metadata = {
  title: 'Admin Panel | Memoire',
}

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const [userCount, expCount, pubCount, revenueResult] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.experience.count({ where: { deletedAt: null } }),
    prisma.experience.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
    prisma.order.aggregate({ where: { status: 'PAID' }, _sum: { amountPaise: true } }),
  ])

  const recentUsers = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, name: true, email: true, createdAt: true, role: true, _count: { select: { experiences: true } } },
  })

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { user: { select: { name: true, email: true } } },
  })

  const totalRevenue = (revenueResult._sum.amountPaise || 0) / 100

  return (
    <div className={styles.admin}>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>🛡️ Admin Panel</h1>
        <Link href="/dashboard" className="btn btn-ghost btn-sm">← Back to Dashboard</Link>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { label: 'Total Users', value: userCount, icon: '👥', color: '#7C3AED' },
          { label: 'Total Experiences', value: expCount, icon: '🎁', color: '#3B82F6' },
          { label: 'Published', value: pubCount, icon: '🌐', color: '#10B981' },
          { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <span style={{ fontSize: '2rem' }}>{s.icon}</span>
            <div>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Recent Users */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Users</h2>
          <div className={styles.table}>
            {recentUsers.map((u: any) => (
              <div key={u.id} className={styles.tableRow}>
                <div>
                  <div className={styles.userName}>{u.name || 'No name'}</div>
                  <div className={styles.userEmail}>{u.email}</div>
                </div>
                <div className={styles.tableRight}>
                  <span className="badge badge-neutral">{u._count.experiences} exp</span>
                  {u.role === 'ADMIN' && <span className="badge badge-warning">ADMIN</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <div className={styles.table}>
            {recentOrders.map((o: any) => (
              <div key={o.id} className={styles.tableRow}>
                <div>
                  <div className={styles.userName}>{o.user.name || o.user.email}</div>
                  <div className={styles.userEmail}>{o.orderNumber}</div>
                </div>
                <div className={styles.tableRight}>
                  <span>₹{(o.amountPaise / 100).toLocaleString()}</span>
                  <span className={`badge ${o.status === 'PAID' ? 'badge-success' : o.status === 'FAILED' ? 'badge-error' : 'badge-warning'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

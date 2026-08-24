import { cookies } from 'next/headers';
import { AdminCalendar } from '@/components/admin-calendar';
import { AdminLogin } from '@/components/admin-login';
import { ADMIN_COOKIE, isOwnerSession } from '@/lib/admin-auth';
export const dynamic = 'force-dynamic';
export default function AdminCalendarPage() { return isOwnerSession(cookies().get(ADMIN_COOKIE)?.value) ? <AdminCalendar /> : <AdminLogin />; }

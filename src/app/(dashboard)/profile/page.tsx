import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Perfil de Usuario</h2>
                <p className="text-muted-foreground">Administra tu información personal y configuración de cuenta</p>
            </div>
            <ProfileForm />
        </div>
    )
}

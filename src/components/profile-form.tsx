"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserProfile {
    email: string
    firstName: string
    lastName: string
    role: string
    ruc: string
    phone: string
    birthDate: string
    address: string
    city: string
    country: string
    bio: string
    company: string
    position: string
    website: string
}

export function ProfileForm() {
    const [profile, setProfile] = useState<UserProfile>({
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        ruc: "",
        phone: "",
        birthDate: "",
        address: "",
        city: "",
        country: "Perú",
        bio: "",
        company: "",
        position: "",
        website: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)
            const supabase = createClient()

            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    const metadata = user.user_metadata || {}
                    setProfile({
                        email: user.email || "",
                        firstName: metadata.first_name || "",
                        lastName: metadata.last_name || "",
                        role: metadata.role || "",
                        ruc: metadata.ruc || "",
                        phone: metadata.phone || "",
                        birthDate: metadata.birth_date || "",
                        address: metadata.address || "",
                        city: metadata.city || "",
                        country: metadata.country || "Perú",
                        bio: metadata.bio || "",
                        company: metadata.company || "",
                        position: metadata.position || "",
                        website: metadata.website || "",
                    })
                }
            } catch (error) {
                console.error("Error fetching profile:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        setMessage(null)
        const supabase = createClient()

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    first_name: profile.firstName,
                    last_name: profile.lastName,
                    full_name: `${profile.firstName} ${profile.lastName}`,
                    phone: profile.phone,
                    birth_date: profile.birthDate,
                    address: profile.address,
                    city: profile.city,
                    country: profile.country,
                    bio: profile.bio,
                    company: profile.company,
                    position: profile.position,
                    website: profile.website,
                    ruc: profile.ruc,
                },
            })

            if (error) throw error

            setMessage({ type: "success", text: "Perfil actualizado correctamente" })
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Error al actualizar el perfil",
            })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Cargando perfil...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header con Avatar */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                            <AvatarFallback className="text-lg">
                                {profile.firstName.charAt(0)}
                                {profile.lastName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-semibold">
                                {profile.firstName} {profile.lastName}
                            </h3>
                            <p className="text-muted-foreground">{profile.email}</p>
                            <Badge variant="secondary">{profile.role}</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Información Personal */}
            <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Datos básicos de tu perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombres</Label>
                            <Input
                                id="firstName"
                                value={profile.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellidos</Label>
                            <Input
                                id="lastName"
                                value={profile.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" value={profile.email} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="+51 999 999 999"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={profile.birthDate}
                                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ruc">RUC</Label>
                            <Input
                                id="ruc"
                                value={profile.ruc}
                                onChange={(e) => handleInputChange("ruc", e.target.value.replace(/\D/g, ""))}
                                maxLength={11}
                                placeholder="12345678901"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información de Contacto */}
            <Card>
                <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                    <CardDescription>Dirección y ubicación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                            id="address"
                            value={profile.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Av. Principal 123, Distrito"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input
                                id="city"
                                value={profile.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                placeholder="Lima"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">País</Label>
                            <Select value={profile.country} onValueChange={(value) => handleInputChange("country", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Perú">Perú</SelectItem>
                                    <SelectItem value="Colombia">Colombia</SelectItem>
                                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                                    <SelectItem value="Chile">Chile</SelectItem>
                                    <SelectItem value="Argentina">Argentina</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información Profesional */}
            <Card>
                <CardHeader>
                    <CardTitle>Información Profesional</CardTitle>
                    <CardDescription>Datos sobre tu actividad profesional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input
                                id="company"
                                value={profile.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                placeholder="Nombre de tu empresa"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Cargo</Label>
                            <Input
                                id="position"
                                value={profile.position}
                                onChange={(e) => handleInputChange("position", e.target.value)}
                                placeholder="Tu cargo o posición"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Sitio Web</Label>
                        <Input
                            id="website"
                            value={profile.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                            placeholder="https://tuempresa.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            placeholder="Cuéntanos sobre ti y tu experiencia..."
                            rows={4}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Mensaje de estado */}
            {message && (
                <div
                    className={`p-4 rounded-md ${
                        message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </div>
    )
}

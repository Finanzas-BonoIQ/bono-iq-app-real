"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        // Obtener sesión inicial
        const getInitialSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)

            // Si no hay usuario en rutas protegidas, redirigir a login
            if (!session?.user) {
                router.push("/login")
            }
        }

        getInitialSession()

        // Escuchar cambios de autenticación
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)

            if (event === "SIGNED_IN") {
                router.push("/dashboard")
            } else if (event === "SIGNED_OUT") {
                router.push("/login")
            }
        })

        return () => subscription.unsubscribe()
    }, [router, pathname, supabase.auth])

    // Mostrar loading mientras verifica autenticación
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Cargando...</p>
                </div>
            </div>
        )
    }

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

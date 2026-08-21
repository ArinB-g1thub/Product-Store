import type { Product } from "@/types/product"

const BASE_URL = 'https://fakestoreapi.com'

export async function fetchProduct(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`)
    if (!res.ok){
        throw new Error(`Failed to Fetch Product: ${res.status}`)
    }
    return res.json()
}

export async function fetchCategories(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/products/categories`)
    if (!res.ok){
        throw new Error(`Failed to Fetch Product Categories: ${res.status}`)
    }
    return res.json()
}

export async function fetchProductById(id: string | number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    if (!res.ok){
        throw new Error(`Failed to Fetch product ${id}: ${res.status}`)
    }
    return res.json()
}
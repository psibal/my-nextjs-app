"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash, Package, Search } from "lucide-react";
import { EditProductDialog } from "./edit-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    imageUrl: string | null;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface ProductsTableProps {
    data: Product[];
}

export function ProductsTable({ data }: ProductsTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

    const filteredData = data.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-xl bg-glass shadow-lg transition-all hover:shadow-xl dark:bg-glass-dark overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {product.imageUrl ? (
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-10 w-10 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                                <Package className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">
                                            {product.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.published ? "default" : "secondary"}>
                                            {product.published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Product
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => setDeletingProduct(product)}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete Product
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {editingProduct && (
                <EditProductDialog
                    product={editingProduct}
                    open={!!editingProduct}
                    onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
                />
            )}

            {deletingProduct && (
                <DeleteProductDialog
                    productId={deletingProduct.id}
                    productName={deletingProduct.name}
                    open={!!deletingProduct}
                    onOpenChange={(open: boolean) => !open && setDeletingProduct(null)}
                />
            )}
        </div>
    );
}

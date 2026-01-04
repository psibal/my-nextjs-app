"use client";

import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/lib/actions/products";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteProductDialogProps {
    productId: string;
    productName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteProductDialog({
    productId,
    productName,
    open,
    onOpenChange,
}: DeleteProductDialogProps) {
    const { execute, status } = useAction(deleteProduct, {
        onSuccess: () => {
            toast.success("Product deleted successfully");
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.error.serverError || "Failed to delete product");
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product
                        <span className="font-semibold text-foreground"> &quot;{productName}&quot;</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={status === "executing"}>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        disabled={status === "executing"}
                        onClick={() => execute({ id: productId })}
                    >
                        {status === "executing" ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Product"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

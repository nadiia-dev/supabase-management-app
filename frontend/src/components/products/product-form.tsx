"use client";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validation";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { uploadImages } from "@/actions/upload-files";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useUser } from "@/hooks/use-user";
import { useProducts } from "@/context/products-context";

const ProductForm = ({
  product,
  formMode,
}: {
  product?: Product;
  formMode: string;
}) => {
  const { data: user } = useUser();
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      image: product?.image || "",
      status: product?.status || "draft",
    },
  });

  const { createProduct, updateProduct } = useProducts();

  const onSubmit = (values: z.infer<typeof createProductSchema>) => {
    const author = user?.id || product?.author;
    if (!author) {
      throw new Error("Author is required but not found in user or product");
    }
    const newProduct = {
      title: values.title,
      description: values.description || "",
      image: values.image || "",
      team_id: user?.team_id!,
      author,
      status: values.status,
    };

    if (formMode === "add") {
      createProduct.mutate(newProduct);
    }
    if (formMode === "edit") {
      updateProduct.mutate({ id: product?.id!, data: newProduct });
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const newUrl = await uploadImages(file, "products");

      form.setValue("image", newUrl?.data);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your description here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-4 md:w-1/3">
              <Label htmlFor="picture" className="text-sm leading-none">
                Avatar
              </Label>
              {form.watch("image") && (
                <Avatar className="h-30 w-30 rounded-lg overflow-hidden">
                  <AvatarImage
                    src={form.watch("image") || "https://placehold.co/400x400"}
                    alt={product?.title || "user avatar"}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              )}
              <div>
                <Input id="picture" type="file" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button type="button">Activate</Button>
            <Button type="submit">Update product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;

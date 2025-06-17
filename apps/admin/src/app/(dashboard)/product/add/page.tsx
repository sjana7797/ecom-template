"use client";

import { Button, buttonVariants } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@repo/ui/components/form";
import { useForm, zodResolver } from "@repo/ui/lib/form";
import React from "react";
import {
  addProductSchema,
  AddProductForm,
} from "@repo/validators/forms/product";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";

function AddProductPage() {
  const form = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      status: "draft",
      stock: 0,
    },
  });

  function onSubmit(values: AddProductForm) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4">
      <Form {...form}>
        <form className="w-full space-y-4">
          <div className="flex items-center justify-between gap-x-4">
            <h2 className="text-xl font-bold tracking-wide md:text-3xl">
              Add Product
            </h2>
            <div>
              <Button size="sm">Save Product</Button>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full flex-col gap-x-2 gap-y-4 lg:flex-row">
              <Card className="w-full lg:w-7/12">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Product Slug"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Slug is a unique identifier for the product. And will
                          be auto generated.
                        </FormDescription>
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
                            placeholder="Product Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="w-full lg:w-5/12">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4"></CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddProductPage;

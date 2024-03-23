"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [errors, setErrors] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setErrors("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setErrors(data?.error);
        setSuccess(data?.success);
      });
    });
    console.log({ values });
  };

  return (
    <CardWrapper
      headerLabel={"Forgot Your Password"}
      backButtonLabel={"Back to Login"}
      backButtonHref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={"johndoe@mail.com"}
                      type={"email"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errors} />
          <FormSuccess message={success} />
          <Button type={"submit"} className={"w-full"} disabled={isPending}>
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

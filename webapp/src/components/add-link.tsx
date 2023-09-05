import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { NewLink, RedirectLink } from "./model/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useRedirectLinks } from "@/hooks/useRedirectLinks";

type AddNewLinkProps = {
  addLink: (newLink: NewLink) => Promise<any>;
  updateLink: (newLink: RedirectLink) => Promise<any>;
  dialogOpen: boolean;
  setDialogOpen: (state: boolean) => void;
  setLink: (state: RedirectLink | undefined) => void;
  link?: RedirectLink;
};

const AddNewLink = ({
  addLink,
  link,
  setLink,
  dialogOpen,
  setDialogOpen,
  updateLink,
}: AddNewLinkProps) => {
  const formSchema = z.object({
    slug: z.string().min(2, {
      message: "Slug must be at least 2 characters.",
    }),
    url: z.string().regex(/http(s)?:\/\/.*/, {
      message: "Url must start with http/https",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      url: "https://",
    },
  });

  useEffect(() => {
    if (link?.slug) form.setValue("slug", link.slug);
    if (link?.url) form.setValue("url", link.url);
  }, [link]);

  const onSubmit: SubmitHandler<NewLink> = (data) => {
    if (!link) {
      addLink(data).then(() => {
        form.reset();
        setDialogOpen(false);
      });
    } else {
      updateLink({
        id: link.id,
        enabled: link.enabled,
        slug: data.slug,
        url: data.url,
      }).then(() => {
        setLink(undefined);
        form.reset();
        setDialogOpen(false);
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" text-lg gap-2">
          <PlusCircle size={18} /> New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-11/12 rounded-md">
        <DialogHeader className="text-2xl font-bold border-b-4 border-rose-600">
          <div>
            <span className="text-rose-600">Add</span> Link
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-600">Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-600">URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewLink;

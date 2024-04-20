"use server"

import { z } from "zod"
import { formSchema } from "../bbs-posts/create/page"
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const postBBS = async ({ username, title, content }: z.infer<typeof formSchema>) => {
    await prisma.post.create({
        data: {
            username,
            title,
            content,
        }
    });
    revalidatePath('/');
    redirect('/');
}

// 削除機能を追加
export const deleteBBS = async (id: number) => {
    await prisma.post.delete({
        where: {
            id
        }
    });
    revalidatePath('/');
    redirect('/');
}

// 更新機能を追加
export const updateBBS = async (id: number, { username, title, content }: z.infer<typeof formSchema>) => {
    await prisma.post.update({
        where: {
            id
        },
        data: {
            username,
            title,
            content,
        }
    });
    revalidatePath('/');
    redirect('/');
}
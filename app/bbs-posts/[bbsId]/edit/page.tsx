"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../create/page';
import { z } from 'zod';
import { BBSData } from '@/app/types/types';
import { updateBBS } from '@/app/actions/postBBSAction';

async function getDetailBBSData(id: string) {
    const response = await fetch(`http://localhost:3000/api/post/${id}`, {
      cache: "no-store",
    });
    
    const bbsDetailData: BBSData = await response.json();
  
    return bbsDetailData;
}

const EditBBSPage = ({params}: {params: {bbsId: string}}) => {

    const [bbsDetailData, setBbsDetailData] = useState<BBSData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDetailBBSData(params.bbsId);
            setBbsDetailData(data);
        };
        fetchData();
    }, [params.bbsId]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: bbsDetailData?.username || '',
            title: bbsDetailData?.title || '',
            content: bbsDetailData?.content || '',
        },
    });

    useEffect(() => {
        if (bbsDetailData) {
            form.reset({
                username: bbsDetailData.username,
                title: bbsDetailData.title,
                content: bbsDetailData.content,
            });
        }
    }, [bbsDetailData, form]);

    async function onSubmit(value: z.infer<typeof formSchema>) {
        const { username, title, content } = value;
        try {
            await updateBBS(parseInt(params.bbsId), { username, title, content });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                                <Input placeholder="ユーザー名" {...field} defaultValue={bbsDetailData?.username} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>タイトル</FormLabel>
                            <FormControl>
                                <Input placeholder="タイトル" {...field} defaultValue={bbsDetailData?.title} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>本文</FormLabel>
                            <FormControl>
                                <Textarea placeholder='投稿内容' className='resize-none' {...field} defaultValue={bbsDetailData?.content} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EditBBSPage

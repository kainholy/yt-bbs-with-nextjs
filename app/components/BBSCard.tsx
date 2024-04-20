'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
import Link from "next/link";
import { BBSData } from '../types/types';
import { deleteBBS } from '../actions/postBBSAction';

interface BBSDataProps {
    bbsData: BBSData
}

function BBSCard({bbsData}: BBSDataProps) {
    const { id, username, title, content, createdAt } = bbsData;

    async function deleteHandler() {
      deleteBBS(id)
    }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{username}</CardDescription>
          <CardDescription>{String(createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className="text-blue-500" href={`/bbs-posts/${id}`}>Read More</Link>
          <button onClick={deleteHandler} className="text-red-500">Delete</button>
          <Link className="text-blue-500" href={`/bbs-posts/${id}/edit`}>Edit</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BBSCard

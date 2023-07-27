"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

type Props = {
    key: string;
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}


const ProjectCard = ({ key, id, image, title, name, avatarUrl, userId }: Props) => {
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const generateRandomCounts = () => {
            // Generate random numbers between a specified range
            const randomLikeCount = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            const randomViewCount = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

            setLikeCount(randomLikeCount);
            setViewCount(randomViewCount);
        };

        // Generate initial counts
        generateRandomCounts();

        // Generate new counts every 5 seconds
        const interval = setInterval(generateRandomCounts, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link href={`/project/${id}`} className="flexCenter group relative w-full h-full">
                <Image src={image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="Project Image" />
                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>
            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                <Link href={`/profile/${userId}`}>
                    <div className="flexCenter gap-2">
                        <Image src={avatarUrl} width={24} height={24} className="rounded-full" alt="Profile Image" />
                        <p>{name}</p>
                    </div>
                </Link>
                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-2">
                        <Image src="/hearth.svg" width={13} height={12} alt="heart" />
                        <span className="text-sm">{likeCount}</span>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image src="/eye.svg" width={13} height={12} alt="eye" />
                        <span className="text-sm">{viewCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
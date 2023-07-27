'use client'
import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import { useState } from "react"
import Button from "./Button"
import { createNewProject, fetchToken, updateProject } from "@/libs/action"
import { useRouter } from "next/navigation"

type Props = {
    type: string,
    session: SessionInterface;
    project?: ProjectInterface;
}

const ProjectForm = ({ type, session, project }: Props) => {
    const router = useRouter()
    const [form, setForm] = useState({
        image: project?.image || '',
        title: project?.title || '',
        description: project?.description || '',
        liveSiteUrl: project?.liveSiteUrl || '',
        githubUrl: project?.githubUrl || '',
        category: project?.category || ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        if (!file) return;
        if (!file.type.includes('image')) return alert('Please upload image file')

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result)
        }

    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const { token } = await fetchToken()

        try {
            if (type === 'create') {
                await createNewProject(form, session?.user?.id, token);
                router.push('/')
            }

            if (type === 'edit') {
                await updateProject(form, project?.id as string, token)
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleStateChange = (fileName: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [fileName]: value
        }))
    }

    return (
        <form onSubmit={handleFormSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input id="image" type="file" accept="image/*" required={type === 'create'}
                    className="form_image-input" onChange={handleChangeImage} />
                {form.image && (
                    <Image src={form?.image} className="sm:p-10 object-container z-20" alt='poster' fill />
                )}
            </div>

            <FormField title="Title" state={form.title} placeholder="flexible" setState={(value) => handleStateChange('title', value)} />
            <FormField title="Description" state={form.description} placeholder="showcase and discover remarkable projects" setState={(value) => handleStateChange('description', value)} />
            <FormField type="url" title="Web URL" state={form.liveSiteUrl} placeholder="https://aruteiru.com" setState={(value) => handleStateChange('liveSiteUrl', value)} />
            <FormField type="url" title="Github URL" state={form.githubUrl} placeholder="https://github.com" setState={(value) => handleStateChange('githubUrl', value)} />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button title={
                    isSubmitting
                        ? `${type === 'create' ? 'Creating' : 'Editing'}`
                        : `${type === 'create' ? 'Create' : 'Edit'}`
                }
                    type="submit" leftIcon={isSubmitting ? "" : "/plus.svg"} isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}

export default ProjectForm
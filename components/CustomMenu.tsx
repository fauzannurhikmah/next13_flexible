import { Menu } from '@headlessui/react'
import Image from 'next/image'

type Props = {
    title: string;
    state: string;
    filters: Array<string>;
    setState: (value: string) => void;
}

const CustomMenu = ({ title, state, filters, setState }: Props) => {
    return (
        <div className='flexStart flex-col w-full gap-7 relative'>
            <label htmlFor={title} className="w-full text-gray-100">{title}</label>
            <Menu as='div' className='self-start relative'>
                <div>
                    <Menu.Button className='flexCenter custom_menu-btn'>
                        {state || 'Select a category'}
                        <Image alt='Arrow down' src='/arrow-down.svg' width={10} height={5} />
                    </Menu.Button>
                </div>
                <Menu.Items className='flexStart custom_menu-items'>
                    {filters.map((tag, index) =>
                        <Menu.Item key={index}>
                            <button type='button' value={tag} className='custom_menu-item' onClick={(e) => setState(e.currentTarget.value)}>{tag}</button>
                        </Menu.Item>
                    )}
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default CustomMenu
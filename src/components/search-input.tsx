'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import queryString from 'query-string'
import { ChangeEventHandler, useEffect, useState } from 'react'

export const SearchInput = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const categoryId = params.get('categoryId')
	const name = params.get('name')

	const [value, setValue] = useState<string>(name || '')
	const debouncedValue = useDebounce<string>(value, 500)

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value)
	}

	useEffect(() => {
		const query = {
			name: debouncedValue,
			categoryId: categoryId,
		}

		const url = queryString.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url)
	}, [debouncedValue, router, categoryId])

	return (
		<div className="relative">
			<Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
			<Input
				onChange={onChange}
				value={value}
				placeholder="Search..."
				className="pl-10 bg-primary/10"
			/>
		</div>
	)
}

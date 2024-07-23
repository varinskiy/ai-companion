import prismadb from '@/lib/prismadb'

import { Categories } from '@/components/categories'
import { SearchInput } from '@/components/search-input'

const RootPage = async () => {
	const categories = await prismadb.category.findMany()

	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
		</div>
	)
}

export default RootPage
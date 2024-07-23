import prismadb from '@/lib/prismadb'

import { CompanionForm } from './components/companion-form'

interface CompanionIdPageProps {
	params: { companionId: string }
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
	// TODO: Check subscription

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
		},
	})

	// console.log(111)
	// const companion = await prismadb.companion

	console.log(companion)

	const categories = await prismadb.category.findMany()

	return <CompanionForm initialData={companion} categories={categories} />
}

export default CompanionIdPage

import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { companionId: string } }
) {
	try {
		const body = await req.json()
		const user = await currentUser()
		const { src, name, description, instructions, seed, categoryId } = body

		if (!params.companionId) {
			return new NextResponse('Companion ID is required', { status: 400 })
		}

		// TODO: remove user.username ?
		if (!user || !user.id || (!user.firstName && !user.username)) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (
			!src ||
			!name ||
			!description ||
			!instructions ||
			!seed ||
			!categoryId
		) {
			return new NextResponse('Missing required field', { status: 400 })
		}

		// TODO: Check for subscription

		const companion = await prismadb.companion.update({
			where: {
				id: params.companionId,
			},
			data: {
				categoryId,
				userId: user.id,
				userName: user.firstName ?? user.username,
				src,
				name,
				description,
				instructions,
				seed,
			},
		})

		return NextResponse.json(companion)
	} catch (error) {
		console.log('[COMPANION_PATCH]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}

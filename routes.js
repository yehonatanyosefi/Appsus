import HomePage from './views/HomePage.js'
import NotesIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'

import MailDetails from './apps/mail/pages/MailDetails.js'
// import MailList from './apps/mail/cmps/MailList.js'
import BookIndex from './apps/book/pages/BookIndex.js'
import BookDetails from './apps/book/pages/BookDetails.js'
import BookEdit from './apps/book/cmps/BookEdit.js'
import BookAdd from './apps/book/cmps/BookAdd.js'

import AboutUs from './views/AboutUs.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/mail',
			component: MailIndex,
		},
		{
			path: '/mail/:mailId',
			component: MailDetails
		},
		{
			path: '/notes',
			component: NotesIndex
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/book',
			component: BookIndex
		},
		{
			path: '/book/:bookId',
			component: BookDetails,
			name: 'details',
			props: true
		},
		{
			path: '/book/edit/:bookId',
			component: BookEdit
		},
		{
			path: '/book/add/',
			component: BookAdd
		},
		// Last fallback if no route was matched:
		{
			path: '/:catchAll(.*)',
			component: HomePage
		}
	],
}

export const router = createRouter(routerOptions)

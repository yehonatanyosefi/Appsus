import HomePage from './views/HomePage.js'
import NotesIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
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
			component: MailIndex
		},
		{
			path: '/note',
			component: NotesIndex
		},
		{
			path: '/about',
			component: AboutUs,
		},
		// {
		// 	path: '/note',
		// 	component: NoteIndex
		// },
	],
}

export const router = createRouter(routerOptions)

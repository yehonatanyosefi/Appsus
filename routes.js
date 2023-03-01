import HomePage from './views/HomePage.js'
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
			path: '/email',
			component: EmailIndex
		},
		{
			path: '/notes',
			component: NotesIndex
		},
		{
			path: '/about',
			component: AboutUs,
		},
		// {
		// 	path: '/book',
		// 	component: BookIndex
		// },
	],
}

export const router = createRouter(routerOptions)

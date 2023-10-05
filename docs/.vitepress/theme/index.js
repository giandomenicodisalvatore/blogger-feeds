// styles
import 'uno.css'
import './style.css'

// defaults
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './Layout.vue'

// enhanced
export default {
	...DefaultTheme,
	Layout,
}

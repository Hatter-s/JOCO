<script setup lang="ts">
import Logo from "@/assets/image/logo.svg";
</script>

<template>
	<div class="sidebar background-white">
		<div class="navbar-height relative shadow-md sidebar-spacing">
			<img :src="Logo" alt="logo" class="relative top-1/2 -translate-y-1/2" />
		</div>
		<div>
			<p class="subtitle-text uppercase text-xs sidebar-spacing py-3 font-medium">
				menu
			</p>
			<ul>
				<li class="subtitle-text">
					<router-link :to="{ name: 'home' }" activeClass="link-active" class="sidebar-link">
						<div class="sidebar-spacing flex items-center gap-2 py-3">
							<List />
							Bài đăng
						</div>
					</router-link>
				</li>
				<li class="subtitle-text">
					<router-link :to="{ name: 'user' }" activeClass="link-active" class="sidebar-link">
						<div class="sidebar-spacing flex items-center gap-2 py-3">
							<Chart />
							Cá nhân
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.link-active div {
	@apply bg-primary/10 text-primary
}

.link-active::before {
	content: '';
	@apply left-0 top-0 bottom-0 w-[5px] bg-primary absolute;
}

.sidebar-link {
	@apply text-sm gap-3 relative;
}
</style>

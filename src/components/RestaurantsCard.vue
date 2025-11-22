<template>
<article class="restaurants-card">
	<div class="restaurants-text">
		<h6 class="restaurants-title">{{item.name}}</h6>
		<p>{{item.rating}}</p>
		<p>{{ item.openingHours }}</p>
		<p>{{ item.locationTag }}</p>
	</div>
	<div class="restaurants-img">
		<img :src="item.coverImage"   alt="item.name" />
	</div>
	<div class="btn-group">
		<button type="button" class="navigate-btn">導航</button>
		<button type="button" class="detail-btn">查看詳情</button>
	</div>
</article>
</template>
<script setup>
defineProps({
	item:{
		type:Object,
		required:true
	}
})

</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.sort-bar{
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding:20px;

	.price-button{
		@include button-style;
		color: #fff;
	}
	.rate-button{
		@include button-style;
		color: #fff;
	}
}

.restaurants-card{
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
	padding: 20px;
	border-radius: 16px;

	.restaurants-text{
		display: flex;
		flex-direction: column;
		width: 50%;
	
	.restaurants-title{
		@include subheading-style;
		color: $primary-color;
	}
	& p{
		@include paragraph-style;
	}
	}

	.restaurants-img{
		width: 50%;
		background-color: #fff;
		padding: 10px;
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);

		& img{
			max-width: 180px;
			border-radius: 16px;
			object-fit: cover;
			overflow: hidden;
			display: block;
		}

	}
	.btn-group{
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 10px;

		.navigate-btn{
			@include button-style;
			color: #fff;
		}
		.detail-btn{
			@include button-style;
			color: #fff;
		}
	}
}

</style>

<template>
    <div class="user">
        <!-- 登陆前 -->
        <div class="login-trigger" v-if="!isLogin">
            <Icon :size="24" type="yonghu" />
            <p class="user-name">未登录</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLogin: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    padding: 16px;
    padding-bottom: 0;
    margin-bottom: 12px;

    .login-trigger {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .user-name {
        margin-left: 8px;
    }
}
</style>

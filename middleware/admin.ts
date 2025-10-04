export default defineNuxtRouteMiddleware((to, from) => {
  const locale = useLocalePath();
  const role = useCookie("role");
  if (to.path === locale("/admin-panel") && role.value != "ADMIN") {
    return navigateTo(locale("/inventory"));
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  const locale = useLocalePath();
  const role = useCookie("role");

  if (to.path.includes("/admin-panel") && role.value != "ADMIN") {
    return navigateTo(locale("/inventory"));
  }
});

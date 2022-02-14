export interface ProductRouteParams {
  id: string;
}

// AUTH
export const SignInRoute: string = "/signin";
export const SignUpRoute: string = "/signup";
export const ForgotPasswordRoute: string = "/forgot-password";
// HOME
export const HomeRoute: string = "/";
// PRODUCTS
export const ProductsRoute: string = "/products";
export const ProductRoute = {
  template: `${ProductsRoute}/:id`,
  format: ({ id }: ProductRouteParams): string => `${ProductsRoute}/${id}`,
};

export const AddProductRoute: string = "/products/add-product";
// DASHBOARD
export const DashboardRoute: string = "/dashboard";

// export const SettingsRoute: string = "/settings";

export const ProfileRoute: string = "/profile";
export const UsersRoute: string = "/users";

export const AddUserRoute: string = "/user-accounts";

export const SellingPointsRoute: string = "/selling-points";
export const AddSellingPointRoute: string = "/selling-points/add-selling-point";

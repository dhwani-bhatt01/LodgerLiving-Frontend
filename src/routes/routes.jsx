import { Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";

export const AppRoutes = () => {
	return useRoutes([
		{
			path: "",
			element: (
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			),
			children: [...PublicRoutes, ...PrivateRoutes],
		},
	]);
};
//outlet renders the current route selected

import { Metadata, Viewport } from "next";
import Layout from "../../layout/layout";
import PageTitle from "./components/common/components/pageTitle";

interface AppLayoutProps {
	children: React.ReactNode;
}

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
};

export const metadata: Metadata = {
	title: "Sistema de Gestión",
	description:
		"Sistema de gestión empresarial.",
	robots: { index: false, follow: false },
	openGraph: {
		type: "website",
		title: "PrimeReact SAKAI-REACT",
		url: "https://sakai.primereact.org/",
		description:
			"The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
		images: ["https://www.primefaces.org/static/social/sakai-react.png"],
		ttl: 604800,
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<>
			<PageTitle />
			<Layout>{children}</Layout>
		</>
	);
}

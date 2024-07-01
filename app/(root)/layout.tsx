import LeftSideBar from '../../components/LeftSideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main>
            <LeftSideBar></LeftSideBar>
            {children}
            <p className="text-white-1">RIGHT</p>
        </main>
    </div>
  );

}

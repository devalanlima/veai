import BackgroundImage from "@/features/components/common/BackgroundImage";
import VeAi from "@/ui/icons/VeAi";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full flex justify-center items-center bg-secondary-light/90 md:bg-transparent md:justify-end md:p-6 lg:p-20 relative max-w-360 mx-auto pt-12">
        <div className="h-15 flex items-center absolute top-0 left-0 justify-center md:mx-6 md:my-4 lg:h-20 lg:mx-20  mx-4 my-2">
          <VeAi />
        </div>
        {children}
        <div className="absolute max-w-80 lg:max-w-87 left-0 bottom-0 m-6 lg:m-20 hidden md:block">
          <p className="font-extralight text-sm italic">
            “No futuro, em um planeta remoto, um jovem Predador, rejeitado por
            seu clã, encontra em Thia uma aliada improvável e embarca em uma
            jornada traiçoeira em busca do adversário supremo.”
          </p>
        </div>
      </div>

      <BackgroundImage src="/image.png" alt="Poster" />
    </>
  );
}

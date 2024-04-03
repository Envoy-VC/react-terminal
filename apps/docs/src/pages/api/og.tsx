/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  try {
    const logoText = await fetch(
      new URL('../../../public/logo-text.png', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontData = await fetch(
      new URL('../../../public/GeistMono-Medium.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const hasDescription = searchParams.has('description');

    const title = hasTitle ? searchParams.get('title')!.slice(0, 100) : null;
    const description = hasDescription
      ? searchParams.get('description')!.slice(0, 154)
      : null;

    return new ImageResponse(
      (
        <div
          tw='h-full w-full flex flex-col bg-[#26397C]'
          style={{
            fontFamily: 'Geist SemiBold',
          }}
        >
          <div tw='flex flex-row w-full h-full justify-center items-center'>
            {title ? (
              <h1 tw='text-white text-[3.5rem] text-[#B0C1FF]'>{title}</h1>
            ) : (
              <img
                src={logoText as unknown as string}
                alt='React Terminal Logo'
                height={72}
                tw='ml-12'
              />
            )}
          </div>
          <div tw='absolute bottom-12 left-12 flex'>
            {title !== null && (
              <img
                src={logoText as unknown as string}
                alt='React Terminal Logo'
                height={32}
              />
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist SemiBold',
            data: fontData,
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong!', { status: 500 });
  }
}

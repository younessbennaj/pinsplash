// import { useEffect, useRef, useState } from 'react';
// import photos from './mocks/photos.json';
// import { UnsplashImage } from './types';

// // function fetchPhotos() {
// //   return new Promise((resolve) => {
// //     resolve(photos);
// //   });
// // }

// function App() {
//   // const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [containerWidth, setContainerWidth] = useState<number>(0);

//   // useEffect(() => {
//   //   fetchPhotos().then((data) => {
//   //     const photos = data;
//   //     setPhotoList(photos as UnsplashImage[]);
//   //   });
//   // }, []);

//   useEffect(() => {
//     function updateContainerWidth() {
//       if (containerRef.current) {
//         setContainerWidth(containerRef.current.offsetWidth);
//       }
//     }

//     // Update container width on mount and resize
//     updateContainerWidth();
//     window.addEventListener('resize', updateContainerWidth);

//     return () => {
//       window.removeEventListener('resize', updateContainerWidth);
//     };
//   }, []);

//   // Configuration
//   const padding = 16 * 2; // 16px padding on each side
//   const columns = 3; // Number of columns
//   const gap = 16; // Gap between columns

//   // Calculating column width
//   const effectiveWidth = containerWidth - padding; // Remove body padding
//   const totalGap = (columns - 1) * gap; // Total space for gaps
//   const columnWidth = (effectiveWidth - totalGap) / columns; // Final column width

//   return (
//     <div>
//       <h1>Pinsplash</h1>
//       <div className="container" ref={containerRef}>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '250px',
//             top: '0px',
//             left: '0px',
//             width: columnWidth,
//           }}
//         >
//           1
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '300px',
//             top: '0px',
//             left: '80px',
//             width: columnWidth,
//           }}
//         >
//           2
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '110px',
//             top: '0px',
//             left: '160px',
//             width: columnWidth,
//           }}
//         >
//           3
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '200px',
//             top: '260px',
//             left: '0px',
//             width: columnWidth,
//           }}
//         >
//           4
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '70px',
//             top: '310px',
//             left: '80px',
//             width: columnWidth,
//           }}
//         >
//           5
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '330px',
//             top: '120px',
//             left: '160px',
//             width: columnWidth,
//           }}
//         >
//           6
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '70px',
//             top: '470px',
//             left: '0px',
//             width: columnWidth,
//           }}
//         >
//           7
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '130px',
//             top: '390px',
//             left: '80px',
//             width: columnWidth,
//           }}
//         >
//           8
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '70px',
//             top: '460px',
//             left: '160px',
//             width: columnWidth,
//           }}
//         >
//           9
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '130px',
//             top: '550px',
//             left: '0px',
//             width: columnWidth,
//           }}
//         >
//           10
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '160px',
//             top: '530px',
//             left: '80px',
//             width: columnWidth,
//           }}
//         >
//           11
//         </div>
//         <div
//           tabIndex={1}
//           className="item"
//           style={{
//             height: '160px',
//             top: '540px',
//             left: '160px',
//             width: columnWidth,
//           }}
//         >
//           12
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { useMediaQuery } from '@uidotdev/usehooks';
import { UnsplashImage } from './types';
import photos from './mocks/photos.json';
import ImageLoader from './components/ImageLoader';

function categorizeByRatio(width: number, height: number) {
  const ratio = width / height;
  if (ratio < 0.8) {
    return 9 / 16; // Retourne le ratio numérique pour '9 / 16'
  } else if (ratio > 1.3) {
    return 4 / 3; // Retourne le ratio numérique pour '4 / 3'
  } else {
    return 1 / 1; // Retourne le ratio numérique pour '1 / 1'
  }
}

function fetchPhotos() {
  return new Promise((resolve) => {
    resolve(photos);
  });
}

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);

  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const numColumns = isMobileOrTablet ? 2 : 3;

  //   // const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);
  //   const containerRef = useRef<HTMLDivElement | null>(null);
  //   const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    fetchPhotos().then((data) => {
      const photos = data;
      setPhotoList(photos as UnsplashImage[]);
    });
  }, []);

  useEffect(() => {
    // Fonction pour mettre à jour la largeur du container
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Utiliser throttle pour limiter la fréquence d'exécution
    const throttledUpdateContainerWidth = throttle(updateContainerWidth, 500);

    // Ajouter un écouteur d'événement pour resize
    window.addEventListener('resize', throttledUpdateContainerWidth);

    // Mise à jour initiale
    updateContainerWidth();

    // Nettoyage des écouteurs et des throttles
    return () => {
      window.removeEventListener('resize', throttledUpdateContainerWidth);
      throttledUpdateContainerWidth.cancel(); // Annuler les throttles en attente
    };
  }, []);

  // Configuration
  const columns = numColumns; // Nombre de colonnes
  const gap = 16; // Espace entre les colonnes

  // Calcul de la largeur des colonnes
  const totalGap = (columns - 1) * gap; // Espace total des gaps
  const columnWidth = (containerWidth - totalGap) / columns; // Largeur finale des colonnes

  // Suivi des hauteurs de chaque colonne
  const columnHeights = Array(columns).fill(0); // Hauteurs initiales de toutes les colonnes

  const calculatePosition = (index: number, height: number) => {
    const columnIndex = index % columns; // Déterminer la colonne
    const top = columnHeights[columnIndex]; // Hauteur actuelle de la colonne
    const left = columnIndex * (columnWidth + gap); // Position horizontale
    columnHeights[columnIndex] += height + gap; // Mise à jour de la hauteur de la colonne
    return { top, left };
  };

  return (
    <div>
      <div className="container" ref={containerRef}>
        {photoList.map((photo, index) => {
          const height =
            columnWidth / categorizeByRatio(photo.width, photo.height);
          const position = calculatePosition(index, height);
          return (
            <div
              key={photo.id}
              tabIndex={1}
              className="item"
              style={{
                ...position,
                height,
                width: columnWidth,
              }}
            >
              <ImageLoader
                aspectRatio={categorizeByRatio(photo.width, photo.height)}
                key={photo.id}
                height={photo.height}
                width={photo.width}
                blurhash={photo.blur_hash}
                imageUrl={`${photo.urls.thumb}&auto=format`}
                alt={photo.alt_description || photo.description || ''}
                srcSet={`
                    ${photo.urls.thumb}&auto=format 200w,
                    ${photo.urls.small}&auto=format 400w,
                    ${photo.urls.regular}&auto=format 1080w,
                    ${photo.urls.full}&auto=format ${photo.width}w
                  `}
                sizes="(max-width: 600px) 200px, (max-width: 1024px) calc((100vw - 48px) / 2), calc((100vw - 64px) / 3)"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

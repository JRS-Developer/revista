/* eslint-disable react/no-unescaped-entities */
import Carousel, { SlideType } from "@/components/Carousel";
import Image from "next/image";
// import GerenciaImg1 from "@/assets/images/gerencia-1.jpeg";
import { ReactNode, Suspense } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Laberinto from "@/components/Juegos/Laberinto";
import Script from "next/script";
import CanTV1 from "@/assets/images/CanTV-1.jpeg";
import CanTV2 from "@/assets/images/CanTV-2.jpeg";
import CanTV3 from "@/assets/images/CanTV-3.jpeg";
import CanTV4 from "@/assets/images/CanTV-4.jpeg";
import PortadaRevista from "@/assets/images/Portada-revista.jpeg";
import LogoUnefa from "@/assets/images/Logo-Unefa.png";

const cantvImagenes = [CanTV1, CanTV2, CanTV3, CanTV4];

const Article = ({
  title,
  portada,
  content,
  autores,
}: {
  title: string;
  autores: string[];
  portada:
    | {
        src: string | StaticImport;
        alt: string;
      }
    | undefined;
  content: ReactNode;
}) => {
  return (
    <div className="prose-lg  md:prose-xl prose max-w-none dark:prose-invert prose-img:rounded-lg prose-h1:text-5xl">
      <h1 className="mb-0">{title}</h1>

      <p className="mt-1 prose-base">Autores: {autores.join(", ")}</p>

      {portada ? (
        <Image
          src={portada.src}
          alt={portada.alt}
          height={600}
          className="float-right ml-8"
        />
      ) : null}

      {content}
    </div>
  );
};

const slides: SlideType[] = [
  {
    id: 1,
    noPadding: true,
    thumbnail: {
      title: "Gerencia y Tecnología en Sectores Públicos y Privados",
      previewImg: {
        src: PortadaRevista,
        alt: "",
      },
    },
    content: (
      <div className="h-full w-full relative">
        <div className="fixed top-0 pt-5 px-4 md:px-10">
          <Image
            src={LogoUnefa}
            alt="UNEFA logo"
            height={100}
            className="md:hidden"
          />
          <Image
            src={LogoUnefa}
            alt="UNEFA logo"
            height={200}
            className="hidden md:block"
          />
        </div>
        <div className="absolute z-[-1] h-full w-full overflow-hidden">
          <Image src={PortadaRevista} alt="" fill className="object-cover" />
        </div>
        <div className="flex justify-center items-center h-full w-full bg-black/80 px-4 lg:px-80">
          <h1 className="text-4xl md:text-7xl md:leading-normal text-center font-semibold">
            Gerencia y Tecnología en Sectores Públicos y Privados
          </h1>
        </div>
      </div>
    ),
  },
  // {
  //   id: 1,
  //   thumbnail: {
  //     title: "El Rol Estratégico de la Gerencia en la Informática",
  //     previewImg: {
  //       alt: "El Rol Estratégico de la Gerencia en la Informática",
  //       src: GerenciaImg1,
  //     },
  //   },
  //   content: (
  //     <Article
  //       title="El Rol Estratégico de la Gerencia en la Informática"
  //       autores={["Nombre 1", "Nombre 2"]}
  //       portada={{
  //         src: GerenciaImg1,
  //         alt: "Gerencia",
  //       }}
  //       content={
  //         <>
  //           <h2>Transformación Digital: Una Oportunidad y un Reto</h2>
  //
  //           <p>
  //             En un entorno empresarial marcado por la evolución tecnológica, la
  //             gerencia en la informática desempeña un papel esencial en la
  //             transformación digital. No solo se trata de implementar sistemas
  //             modernos, sino de garantizar que estos respalden los objetivos
  //             estratégicos de la organización. Empresas de todos los sectores
  //             han comprendido que invertir en tecnología no es un lujo, sino una
  //             necesidad para mantenerse competitivas.
  //           </p>
  //
  //           <ul>
  //             <li>
  //               Detectar nuevas oportunidades de mercado basadas en datos.
  //             </li>
  //             <li>
  //               Optimizar procesos internos para reducir costos y tiempos.
  //             </li>
  //             <li>
  //               Protegerse de amenazas cibernéticas cada vez más sofisticadas.
  //             </li>
  //             <li>
  //               Promover una cultura de innovación dentro de la organización.
  //             </li>
  //           </ul>
  //           <h2>Responsabilidades Clave de la Gerencia Informática</h2>
  //           <p>
  //             Para cumplir con estas demandas, los gerentes de informática
  //             tienen una serie de responsabilidades que van más allá del
  //             mantenimiento de sistemas. Estas incluyen:
  //           </p>
  //           <Image src={GerenciaImg1} alt="Gerencia" />
  //
  //           <ul>
  //             <li>
  //               <strong>Gestión de Talento:</strong> Crear y liderar equipos
  //               multidisciplinarios que combinen conocimientos técnicos y
  //               habilidades estratégicas.
  //             </li>
  //             <li>
  //               <strong>Diseño de Estrategias Digitales:</strong> Planificar
  //               proyectos tecnológicos alineados con las necesidades y
  //               prioridades del negocio.
  //             </li>
  //             <li>
  //               <strong>Supervisión de Infraestructura:</strong> Garantizar que
  //               los sistemas tecnológicos sean escalables, seguros y eficaces.
  //             </li>
  //             <li>
  //               <strong>Fomentar la Innovación:</strong> Explorar y adoptar
  //               tecnologías emergentes como inteligencia artificial, blockchain
  //               y análisis avanzado de datos.
  //             </li>
  //           </ul>
  //
  //           <h2>Impacto en la Toma de Decisiones</h2>
  //           <p>
  //             Uno de los mayores aportes de la gerencia en la informática es su
  //             capacidad para influir en la toma de decisiones basadas en datos.
  //             Herramientas como dashboards, software de análisis predictivo y
  //             sistemas de inteligencia empresarial permiten a los líderes
  //             empresariales:
  //           </p>
  //           <ul>
  //             <li>Anticiparse a cambios en el mercado.</li>
  //             <li>Identificar áreas de mejora operativa.</li>
  //             <li>Medir el impacto de sus estrategias en tiempo real.</li>
  //           </ul>
  //           <p>
  //             Esto transforma a la gerencia informática en un socio estratégico
  //             indispensable, más allá de su rol tradicional como proveedor de
  //             servicios técnicos.
  //           </p>
  //           <h2>Desafíos en la Gerencia Informática</h2>
  //           <p>
  //             A pesar de sus beneficios, la gerencia en la informática también
  //             enfrenta desafíos significativos. Entre ellos se incluyen:
  //           </p>
  //           <ul>
  //             <li>
  //               <strong>Velocidad del Cambio Tecnológico:</strong> Adaptarse
  //               rápidamente a nuevas tecnologías y estándares.
  //             </li>
  //             <li>
  //               <strong>Ciberseguridad:</strong> Proteger la información
  //               sensible de la organización frente a amenazas cada vez más
  //               sofisticadas.
  //             </li>
  //             <li>
  //               <strong>Presupuesto:</strong> Justificar inversiones
  //               tecnológicas en un contexto de restricciones económicas.
  //             </li>
  //             <li>
  //               <strong>Cambio Cultural:</strong> Promover la adopción de
  //               tecnologías en equipos que pueden ser reacios al cambio.
  //             </li>
  //           </ul>
  //
  //           <h2>Futuro de la Gerencia Informática</h2>
  //           <p>
  //             Mirando hacia el futuro, la gerencia informática continuará
  //             evolucionando. La automatización, la inteligencia artificial y la
  //             sostenibilidad tecnológica serán áreas clave de enfoque. Las
  //             empresas que adopten un enfoque proactivo en estas áreas estarán
  //             mejor posicionadas para liderar en un mundo digital.
  //           </p>
  //           <p>
  //             Además, se espera que el rol del gerente de informática sea cada
  //             vez más interdisciplinario, colaborando con otras áreas como
  //             marketing, finanzas y recursos humanos para garantizar que la
  //             tecnología esté al servicio de toda la organización.
  //           </p>
  //
  //           <h2>Conclusión</h2>
  //           <p>
  //             En resumen, la gerencia en la informática es mucho más que la
  //             administración de sistemas. Es un elemento estratégico que permite
  //             a las empresas innovar, adaptarse y competir en un mercado global.
  //             Aquellas organizaciones que inviertan en este campo estarán mejor
  //             preparadas para enfrentar los retos y aprovechar las oportunidades
  //             que trae consigo la era digital.
  //           </p>
  //         </>
  //       }
  //     />
  //   ),
  // },
  {
    id: 2,
    content: (
      <Article
        title="CANTV Falcón ¿A la altura de la era digital?"
        content={
          <>
            <h2>Un análisis crítico de su gestión tecnológica</h2>
            <p>
              Debido a la creciente ola de la tecnología que se vive en la
              actualidad, es imperativo para las organizaciones y empresas
              mantenerse actualizados con todo lo relacionado al mundo digital,
              esto con el objetivo de mejorar la productividad, la toma de
              decisiones y el funcionamiento interno de la misma. Así mismo,
              para poder entender cómo funciona la tecnología en las empresas u
              organizaciones de Venezuela, es necesario ir al campo, para
              comprobar de primera mano, cuáles son sus utilidades, cuáles han
              sido las áreas de mejora y cuáles son los desafíos que estas
              enfrentan a causa de la situación país.
            </p>
            <p>
              Así pues, en la ciudad de Santa Ana de Coro del estado Falcón, se
              tomó como pilar fundamental para poder estudiar el comportamiento
              de la tecnología en las empresas y su relación con el personal
              humano, la Compañía Anónima Nacional Teléfonos de Venezuela mejor
              conocida como "CANTV", esta ha logrado consolidarse a lo largo del
              tiempo como una de las principales empresas encargadas de brindar
              servicios de telecomunicaciones en Venezuela, algunos de estos
              servicios incluyen: Internet, televisión, datos móviles entre
              otros, por su parte, para obtener mucha más información con
              respecto al tema, como grupo nos dirigimos a una de las sedes de
              CANTV en la ciudad de Coro, a través, de una entrevista informal
              realizada al encargado del departamento informático de dicha
              empresa, se registraron sus respuestas con el objetivo de explicar
              en el siguiente análisis el cómo realizan operaciones gerenciales
              y cuales son los desafíos a enfrentar
            </p>
            <p>
              En primer lugar, la empresa CANTV se enfoca en brindar altos
              estándares de tecnología, e innovación de servicios tecnológicos,
              la estructura de la misma va a depender mucho del contexto o las
              necesidades operativas, pero en general trabajan con el área de
              gestión de proyectos, que en las palabras del encargado es crucial
              para coordinar la nuevas propuestas e innovaciones tecnológicas
              que surjan, además de planificar los esfuerzos relacionados con la
              implementación y ejecución de los mismos. Del mismo modo, la
              empresa maneja un gran carrete de autores con los cuales se
              sustentan teóricamente para sus proyectos venideros, uno de estos
              sustentos es El Project Management Instituto o (PMI) quienes en
              (2021) mencionaban que “La gestión efectiva de proyectos es
              esencial para asegurar que las iniciativas tecnológicas se
              completen a tiempo y dentro del presupuesto".
            </p>
            <p>
              De este modo, ellos intentan en gran medida de darle el valor
              necesario a la gestión de los proyectos para garantizar que sean
              de calidad y que cumplan con los objetivos operativos y de la
              empresa. De la mano con lo que sería la gestión de proyectos
              encontramos el desarrollo de software, para llevar a cabo cada uno
              de sus proyectos, dependiendo también de la magnitud del mismo
              pueden utilizar metodología tradicionales o ágiles, la gran parte
              del tiempo usan las ágiles, esto porque maneja un enfoque más
              dinámico e interactivo, además de adaptable a los diferentes
              cambios que puedan surgir, con esto los responsables pueden
              facilitar las operaciones internas y mejoren la experiencia del
              usuario.
            </p>

            <p>
              De igual manera, el soporte técnico es un área vital que se
              encarga de resolver problemas relacionados con hardware y
              software, el soporte técnico es una de las más importantes, y que
              requiere del conocimiento profundo del tema, ya que, si algún
              cliente presenta problemas con sus equipos, es necesario tener la
              capacitación adecuada para manejar, solucionar y dar las
              recomendaciones pertinentes.
            </p>
            <p>
              A su vez, cuentan con el área de administración de sistemas que
              incluye la gestión y mantenimiento de la infraestructura
              tecnológica con la que cuentan, esto incluye equipos de alta gama
              necesaria para el funcionamiento diario, abarca desde servidores,
              redes, hasta bases de datos y de más que son fundamentales para
              las operaciones diarias. Por lo tanto, se aseguran de que todos
              los sistemas funcionen correctamente y estén actualizados con las
              últimas tecnologías para evitar errores de operatividad.
            </p>
            <p>
              De esta forma, cada uno de estos departamentos juega un papel
              crucial en el éxito general del área informática y contribuye a
              cumplir con los objetivos estratégicos de CANTV, siendo uno de
              ellos y su bandera el " Garantizar el acceso a los servicios de
              telecomunicaciones para todos los venezolanos". Ya que una
              organización eficiente dentro del área de informática permite a
              CANTV mantenerse competitiva en un mercado cambiante y responder
              proactivamente a las necesidades del cliente. Además, la
              integración entre estos departamentos facilita una comunicación
              fluida y asegura que todos trabajen hacia un objetivo común:
              Ofrecer un servicio de calidad a los usuarios
            </p>
            <p>
              Ahora bien, al conversar con el personal sobre sus habilidades
              laborales y métodos para planificar sus tareas hemos concluido que
              la información obtenida de los comentarios de los usuarios,
              encuestas y métricas estadísticas, se utiliza para desarrollar
              estrategias que permitan mejorar la infraestructura y los
              servicios de telecomunicaciones ofrecidos en todo el país. Por
              otra parte, desde su nacionalización en el año 2007, ha adoptado
              un enfoque centrado en la justicia social y la democratización del
              acceso a las telecomunicaciones, lo que significa que la empresa
              busca garantizar que todos los ciudadanos, independientemente de
              su ubicación geográfica o situación económica, tengan acceso a
              servicios de telecomunicaciones de calidad como fue antes
              mencionado.
            </p>
            <p>
              Cabe destacar que uno de los pilares fundamentales de la
              metodología de CANTV es la integración comunitaria buscando
              trabajar en estrecha colaboración con las comunidades locales para
              identificar sus necesidades y desarrollar soluciones que respondan
              a esas necesidades. Esto incluye la instalación de redes de
              comunicación en áreas rurales y remotas, así como la
              implementación de programas educativos y de capacitación para
              fomentar el uso de las tecnologías de la información y la
              comunicación (TIC), enfocada también, en una soberanía
              tecnológica, es decir, en el desarrollo y uso de tecnologías
              propias que reduzcan la dependencia del país de proveedores
              extranjeros, este fue un punto muy tocado por el encargado de área
              tecnológica, ya que para lograrlo se requiere de una inversión en
              investigación y desarrollo, así como en la formación de talento
              local en áreas clave de las telecomunicaciones.
            </p>
            <p>
              Sin embargo, a pesar de sus múltiples esfuerzos, enfrentan varios
              desafíos y limitaciones debido en gran medida a la situación
              política, social y económica que vive Venezuela en la actualidad.
              Entre esas limitantes se encuentran la obsolescencia de parte de
              su infraestructura, la falta de inversión en nuevas tecnologías y
              las dificultades económicas que afectan a la mayoría de los
              sectores del país. Estos factores pueden limitar la capacidad de
              la empresa para ofrecer servicios de alta calidad y expandir su
              cobertura.
            </p>
            <p>
              En contraste con esto, busca la manera de seguir adelante a pesar
              de los desafíos, la empresa continúa trabajando para mejorar la
              infraestructura de telecomunicaciones en el país y garantizar que
              todos los ciudadanos tengan acceso a servicios de calidad, el
              impacto del trabajo de CANTV en la sociedad venezolana es
              significativo, al mejorar el acceso a las telecomunicaciones,
              contribuye al desarrollo económico y social del país, permitiendo
              a las comunidades contar con acceso a las tecnologías de la
              información y la comunicación (TIC) y así tener mayores
              oportunidades de educación, empleo y desarrollo personal,
              reflejando un compromiso con la justicia social, la integración
              comunitaria y la soberanía tecnológica, así lo expresaba el
              encargado del área tecnológica.
            </p>
            <p>
              Al momento de entrevistar al representante de CANTV nos habló de
              una visión general de cómo funciona el departamento de Recursos
              Humanos, y en que este se centra en atraer, desarrollar y retener
              el mejor talento humano para asegurar que la empresa pueda cumplir
              con sus objetivos estratégicos, enfocándose siempre en la
              selección de personal, capacitación continua, y la creación de un
              ambiente de trabajo positivo y productivo.
            </p>
            <p>
              En función al tema, se tomó en consideración cual era el proceso y
              comportamiento que debe adoptan a la hora de llevar a cabo un
              proyecto. Como respuesta pues, describió que, al iniciar un
              proyecto, él se debe evaluar su viabilidad y asegurarse de que
              esté alineado con los objetivos de la empresa, formar un equipo
              adecuado es crucial, asignando roles y responsabilidades claras.
              Durante la ejecución, el gerente o encargado debe gestionar el
              tiempo y el presupuesto eficazmente, para identificar y mitigar
              riesgos, y mantener una comunicación fluida con el equipo. La
              capacidad de adaptarse y tomar decisiones rápidas y efectivas es
              vital para el éxito del proyecto
            </p>
            <p>
              Por otro lado, otro punto evaluado, se refiere a cómo administran
              sus recursos humanos para asegurar la eficiencia y productividad,
              el sujeto en cuestión detalló que el proceso de administración del
              recurso humano se basa en varias estrategias clave. Primero, se
              utilizan herramientas avanzadas de selección para garantizar que
              se contrató a los candidatos más adecuados, invirtiendo
              significativamente en la capacitación y desarrollo de los
              empleados (de ser necesario) para que siempre estén al día con las
              últimas tecnologías y prácticas del sector. También se implementa
              políticas de evaluación de desempeño y proporcionamos
              retroalimentación constante para fomentar la mejora continua.
            </p>
            <p>
              Así mismo, se realizó una consulta de cuál era la perspectiva que
              tenía la empresa a futuro, o como se veían en un futuro cercano y
              lejano, como respuesta a esta interrogante el representante
              ratificó el ideal que tenía la empresa para desarrollase a futuro,
              manifestando que CANTV seguirá invirtiendo en la formación y el
              bienestar de sus empleados para fortalecer las políticas de
              equilibrio entre la vida personal y laboral y continuar
              promoviendo un ambiente de trabajo inclusivo y diverso. Además, de
              que se está explorando nuevas tecnologías para mejorar la
              eficiencia en la gestión de recursos humanos y asegurar que
              nuestros empleados tengan las mejores herramientas y recursos para
              desempeñar sus roles de manera efectiva. Así comentaba el jefe de
              este departamento.
            </p>
            <p>
              En función a las necesidades a futuro de la empresa también busca
              una sostenibilidad y responsabilidad social ya que la empresa se
              compromete con prácticas razonables y seguras para la sociedad,
              asegurando que sus operaciones tengan un impacto positivo en la
              comunidad. Además, busca brindarles en la medida de lo posible una
              flexibilidad a sus empleados para que puedan combinar sus
              responsabilidades en la empresa con su vida personal, siempre y
              cuando no afecte el desarrollo de la empresa.
            </p>
            <p>
              Continuando con la entrevista el encargado del área tecnológica
              nos comentó de la importancia de la gestión financiera y
              presupuestaria que manejan en CANTV, y como cualquier gran
              empresa, es un proceso complejo que involucra múltiples áreas y
              niveles de la organización. En una vista más general, esta
              dependerá de 6 elementos clave, comenzando con una planificación
              estratégica donde se definen los objetivos, se identifican los
              proyectos clave y se asignan los recursos en consecuencia;
              posteriormente, se elabora un plan detallado de ingresos y gastos,
              considerando factores como inflación, costos operativos y
              proyecciones de crecimiento; luego se ejecuta un monitoreo
              constante de los gastos reales frente al presupuesto, la
              identificación de desviaciones y la toma de medidas correctivas;
              es necesaria también la administración del flujo de efectivo, la
              optimización de inversiones y la gestión de riesgos financieros.
            </p>
            <p>
              Por otro lado, en última instancia, se registran todas las
              transacciones financieras y se generan los informes financieros
              correspondientes para finalmente realizar una evaluación periódica
              de los procesos en la empresa para garantizar la precisión y el
              cumplimiento de las normas. Bajo la misma premisa, hay ciertas
              consideraciones especiales que tienen que hacerse con la empresa,
              debido a su condición de empresa pública masificada basada en
              tecnología, ejemplo de esto sería que, al ser una empresa de
              servicios públicos, CANTV está sujeta a regulaciones
              gubernamentales que pueden afectar sus tarifas, inversiones y
              operaciones. A su vez, la empresa requiere de grandes inversiones
              en infraestructura de telecomunicaciones, lo que implica una
              gestión financiera cuidadosa, sin contar que está expuesta a
              riesgos como fallas en la red, desastres naturales y competencia.
              Es necesario acotar también el cómo la economía del país puede
              afectar significativamente los ingresos y costos de la empresa.
            </p>
            <p>
              Supone un reto de igual manera, el mantenerse a flote como empresa
              proveedora de servicios públicos más allá de lo antes mencionado,
              esta enfrenta una serie de desafíos y oportunidades, como la
              necesidad de invertir en tecnologías de última generación para
              mantener la competitividad o la búsqueda, de nuevas fuentes de
              ingresos a través de la oferta de servicios adicionales, y de
              eficiencias en los procesos para reducir costos y mejorar la
              rentabilidad, sumado a la implementación de medidas para mitigar
              los riesgos asociados a las operaciones de la empresa
            </p>
            <p>
              Siguiendo con la entrevista, pudimos percatar que a la hora de
              seleccionar y ejecutar un nuevo proyecto se requiere de una
              evaluación cuidadosa y estratégica para el desarrollo de mismo. Ya
              que, se deben considerar diversos criterios para asegurar, no solo
              la viabilidad del proyecto, sino también llevar a cabo los
              objetivos que se tengan planteados y las necesidades del mercado.
            </p>
            <p>
              Ahora bien, uno de los criterios más importantes de los que él nos
              mencionaba el gerente era la alineación del proyecto con la visión
              y misión que tiene CANTV. Esto para asegurar que el proyecto logre
              contribuir positivamente en la mejora de los servicios ofrecidos,
              para eso primeramente se lleva a cabo una revisión detallada de la
              integración que tendrá con la empresa, y así evaluar los
              beneficios tangibles e intangibles que aportará a la misma, como
              el aumento de la eficiencia, y la generación de nuevos ingresos,
              luego de eso se realiza un análisis de la viabilidad económica que
              tenga la empresa, evaluando los costos-beneficio de la misma, se
              debe considerar tanto los costos iniciales como los gastos
              operativos que se tendrá en un futuro, y así, determinar si el
              proyecto generará beneficios suficientes para justificar la
              inversión, pero a su vez debido al entorno económico desafiante
              como lo es el venezolano, este criterio se vuelve aún más
              relevante y más significativo, según palabras del propio gerente,
              así mismo se revisan los recursos disponibles, incluyendo personal
              capacitado, tecnología y presupuesto, necesarios para llevar a
              cabo el proyecto con éxito.
            </p>
            <p>
              Siguiendo con el mismo orden de ideas, algo que también influye
              bastante es el análisis de riesgo, esta empresa como muchas otras
              operan en un contexto donde factores externos impactan
              significativamente sus operaciones, con el mismo se busca
              identificar riesgos potenciales y desarrollar planes de
              mitigación, para asegurar la continuidad del proyecto y minimizar
              impactos negativos. Otro criterio importante es el impacto que el
              proyecto tendrá en los clientes actuales y clientes potenciales,
              se debe evaluar cómo mejorará los servicios ofrecidos o cómo se
              adaptará a las necesidades cambiantes del mercado. Siendo la
              satisfacción del cliente lo esencial para mantener la
              competitividad, por lo que cualquier iniciativa debe centrarse en
              ofrecer valor añadido.
            </p>
            <p>
              Por último, es importante conocer que esta organización opera bajo
              regulaciones específicas que deben ser respetadas para evitar
              sanciones o complicaciones legales que puedan afectar su servicio
              al cliente. Por lo tanto, se aseguran de que el proyecto cumpla
              con todas las normativas vigentes relacionadas con
              telecomunicaciones y protección al consumidor, para evitar
              problemas futuros. Teniendo en cuenta que la forma de gestionar
              los proyectos, hacen que sea necesario un enfoque multifacético
              que considere diversos criterios estratégicos, financieros y
              operativos. El encargado intenta ser proactivo al evaluar estos
              factores para asegurar que cada proyecto no solo sea viable desde
              una perspectiva técnica, sino también alineado con los objetivos
              corporativos y las expectativas de sus usuarios. En un entorno tan
              dinámico como el venezolano, esta capacidad para adaptarse y tomar
              decisiones informadas se convierte en un factor clave para el
              éxito sostenible de la empresa.
            </p>

            <p>
              Por consiguiente, el seguimiento y la evaluación de proyectos son
              elementos cruciales en el éxito de cualquier organización,
              especialmente en una empresa de telecomunicaciones, para
              garantizar esto es fundamental aplicar un enfoque estructurado que
              permita controlar y analizar el progreso en tiempo real, en CANTV,
              el seguimiento del progreso de los proyectos se realiza mediante
              una combinación de herramientas de gestión y un análisis constante
              de métricas de desempeño, utilizan plataformas como Microsoft
              Project, Jira y Trello para organizar, monitorear tareas, asignar
              recursos y establecer cronogramas, estas herramientas permiten una
              visión clara y detallada del progreso en tiempo real, facilitando
              la identificación de posibles cuellos de botella y la
              implementación de estrategias correctivas cuando sea necesario.
              Este enfoque estructurado es esencial para mantener el control del
              proyecto y asegurar que los objetivos se alcancen de manera
              eficiente.
            </p>
            <p>
              Ahora bien, para evaluar el éxito de un proyecto, no se enfoca
              únicamente en los resultados inmediatos, sino que adopta una
              visión amplia que abarca tanto el cumplimiento de los objetivos
              como la eficiencia del proceso, estos elementos son considerados
              indicadores fundamentales de una gestión efectiva. Además, la
              calidad del resultado final es un aspecto clave, ya que debe
              satisfacer tanto las necesidades internas como las expectativas de
              los clientes, analizando la capacidad del proyecto para generar un
              retorno de inversión (ROI) y su impacto en la mejora de los
              servicios y la infraestructura.
            </p>
            <p>
              De esta manera, asegurando que el valor generado sea sostenible a
              largo plazo, el éxito de los mismo se mide comparando los
              resultados finales con los objetivos establecidos al inicio, este
              proceso de evaluación incluye varios factores críticos, como el
              respeto a los plazos, la gestión del presupuesto y la calidad del
              producto o servicio entregado. Para una evaluación más precisa,
              utilizan indicadores de desempeño (KPIs) que miden aspectos como
              la satisfacción del cliente, la tasa de resolución de problemas y
              el impacto en la eficiencia operativa. Estos elementos permiten no
              solo validar el éxito del proyecto en términos cuantitativos, sino
              también evaluar su contribución al crecimiento y desarrollo
              continuo de la empresa.
            </p>
            <p>
              El enfoque integral de la empresa CANTV hacia el monitoreo y la
              evaluación de proyectos asegura que no solo se cumplan los
              objetivos inmediatos, sino que también se optimice el valor a
              largo plazo para la organización. El uso de herramientas
              tecnológicas avanzadas, junto con una evaluación rigurosa basada
              en métricas claras y relevantes, permite a CANTV mantener la
              eficiencia operativa y mejorar continuamente la calidad de sus
              servicios. Este compromiso con la gestión efectiva de proyectos
              fortalece su posición como líder en el sector de las
              telecomunicaciones y garantiza una adaptación constante a los
              cambios y desafíos del mercado.
            </p>
            <p>
              Con este análisis se puede afirmar que por medio de una gerencia
              tecnológica efectiva se pueden optimizar recursos y fomentar la
              innovación, de hecho el propio gerente hizo hincapié en lo
              siguiente " Una gerencia efectiva en el área tecnológica es clave
              para el éxito de CANTV, ya que nos permite ofrecer servicios de
              alta calidad, mejorar la eficiencia operativa y mantenernos
              competitivos en un mercado cada vez más exigente".
            </p>

            <h2>Imágenes:</h2>

            {cantvImagenes.map((image, index) => (
              <Image
                src={image}
                alt={`CanTV imagen ${index + 1}`}
                key={image.src}
              />
            ))}

            <h2>Videos:</h2>

            <div style={{ padding: "75.24% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1034358342?h=81c93f46ae&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="CANTV Falcón ¿A la altura de la era digital? - Podcast"
              ></iframe>
            </div>
            <Script src="https://player.vimeo.com/api/player.js" />
          </>
        }
        portada={undefined}
        autores={[
          "Santiago Rodríguez",
          "David Antequera",
          "Mauricio Camacho",
          "César Loaiza",
          "Louis Yuburi",
          "Moisés Laguna",
        ]}
      />
    ),

    thumbnail: {
      title: "CANTV Falcón ¿A la altura de la era digital?",
      previewImg: undefined,
    },
  },
  {
    id: 3,
    content: (
      <Article
        title="Procesos Informáticos y Gerenciales en la Secretaria de Salud del Estado Falcón"
        content={
          <>
            <h2>Análisis descriptivo</h2>
            <p>
              La tecnología de la información (TI) ha transformado el
              funcionamiento de las instituciones de salud, convirtiéndose en
              una herramienta indispensable para la optimización de servicios,
              mejora de la atención médica y la gestión eficiente de los
              recursos. En un contexto en el que la calidad, la accesibilidad y
              la seguridad de la atención médica son prioridades globales, el
              uso de TI en salud ha permitido alcanzar avances significativos en
              la atención médica basada en evidencia, la mejora de los procesos
              clínicos y la administración hospitalaria.
            </p>

            <p>
              En primer lugar, la tecnología de la información permite gestionar
              de manera más eficiente los registros médicos electrónicos (RME),
              facilitando el acceso a la información de los pacientes en tiempo
              real, lo que resulta crucial para una toma de decisiones más
              rápida y precisa por parte de los profesionales de la salud. Como
              señala Eysenbach (2001), "la digitalización de la información
              médica promueve una atención más segura y centrada en el paciente
              al reducir los errores humanos asociados a la documentación en
              papel" (p. 156). Los RME no solo agilizan el flujo de trabajo,
              sino que también permiten a los profesionales de la salud analizar
              datos históricos y patrones, lo que contribuye a diagnósticos más
              acertados y tratamientos personalizados.
            </p>

            <p>
              Sin embargo, el impacto de la TI en salud no está exento de
              desafíos. La privacidad y la seguridad de los datos son
              preocupaciones primordiales, dado que las violaciones a la
              confidencialidad pueden tener graves consecuencias éticas y
              legales. Según Rindfleisch (1997), "la protección de los datos de
              salud debe ser una prioridad en cualquier sistema de TI, dado que
              la confianza entre pacientes y proveedores depende en gran medida
              de la confidencialidad" (p. 126). Por lo tanto, el uso de
              tecnologías avanzadas de encriptación y el cumplimiento de
              normativas como la HIPAA (Health Insurance Portability and
              Accountability Act) en Estados Unidos, o el RGPD (Reglamento
              General de Protección de Datos) en Europa, son elementos clave
              para garantizar la seguridad de los sistemas de TI en salud.
            </p>

            <p>
              El propósito de este documento es proporcionar una visión
              detallada de la estructura, funciones y capacidades del área
              encargada de gestionar los sistemas tecnológicos. Este análisis
              permite identificar cómo el departamento contribuye a los
              objetivos generales de la institución, optimizando los procesos
              clínicos y administrativos mediante el uso de tecnologías de la
              información. Además, este tipo de análisis busca identificar
              fortalezas y áreas de mejora, garantizando que las soluciones
              tecnológicas estén alineadas con las necesidades de los servicios
              de salud, desde la gestión de datos clínicos hasta la
              implementación de plataformas de telemedicina y sistemas de apoyo
              a la decisión clínica.
            </p>

            <p>
              Por su parte, las funciones del gerente en el departamento de
              informática son cruciales para asegurar la eficiencia y seguridad
              en el manejo de los sistemas tecnológicos. Este profesional es
              responsable de planificar, implementar y supervisar la
              infraestructura tecnológica de la institución, garantizando el
              correcto funcionamiento de los sistemas de información, bases de
              datos y comunicaciones. Además, debe coordinar la integración de
              nuevas tecnologías, gestionar el presupuesto del departamento y
              asegurar que todas las actividades tecnológicas cumplan con las
              normativas de seguridad y protección de datos.
            </p>

            <p>
              Asimismo, el gerente del departamento de informática tiene un rol
              estratégico, ya que debe trabajar en colaboración con otros
              departamentos para desarrollar soluciones tecnológicas que mejoren
              la calidad del servicio de salud, optimicen los recursos y
              reduzcan costos operativos. También es responsable de liderar un
              equipo de especialistas en tecnología, proporcionar capacitaciones
              y garantizar que el personal tenga las herramientas necesarias
              para un manejo eficiente de los sistemas informáticos.
            </p>

            <p>
              Las Secretarías de Salud son instituciones gubernamentales clave
              encargadas de diseñar, ejecutar y supervisar las políticas de
              salud pública en un país o región. Su propósito principal es
              garantizar el acceso a servicios de salud de calidad, promover el
              bienestar general y coordinar los esfuerzos destinados a prevenir
              y controlar enfermedades. Estas secretarías desempeñan un papel
              esencial en la administración y regulación de los sistemas de
              salud, asegurando la adecuada distribución de recursos, el
              cumplimiento de normativas sanitarias y la implementación de
              programas que mejoren la calidad de vida de la población.
            </p>

            <p>
              La importancia de la estructura organizacional dentro de las
              Secretarías de Salud radica en su capacidad para establecer un
              sistema eficiente y coordinado de gestión. Como señala Mintzberg
              (1979), la estructura organizativa es fundamental para "establecer
              un sistema de división de trabajo que permita a las organizaciones
              cumplir con sus objetivos de manera eficiente" (p. 24). En el caso
              de las secretarías de salud, una estructura clara y bien definida
              permite la distribución adecuada de responsabilidades entre sus
              diversas áreas, como la atención primaria, la vigilancia
              epidemiológica, la promoción de la salud y la gestión
              administrativa. Cada departamento dentro de la organización debe
              trabajar de manera interconectada para asegurar que los objetivos
              de salud pública sean alcanzados de manera eficaz.
            </p>

            <p>
              Un componente clave de la estructura organizacional de las
              secretarías de salud es la división entre las áreas operativas y
              las áreas estratégicas. Mientras que las primeras se encargan de
              la prestación directa de servicios, como la atención en hospitales
              o la implementación de campañas de vacunación, las áreas
              estratégicas se ocupan de la planificación, regulación y monitoreo
              del sistema de salud. Según Drucker (1993), "una organización que
              no logre integrar adecuadamente sus funciones operativas y
              estratégicas enfrentará problemas en la toma de decisiones y en la
              implementación de sus políticas" (p. 45). Esto es particularmente
              relevante en el ámbito de la salud, donde la eficiencia
              administrativa y la capacidad de respuesta ante emergencias
              sanitarias son cruciales.
            </p>

            <p>
              Dentro de este marco, la coordinación interdepartamental resulta
              vital. Las decisiones estratégicas que toman las Secretarías de
              Salud dependen del flujo adecuado de información entre sus
              distintas áreas, lo que resalta la importancia de la tecnología de
              la información y de una infraestructura sólida que soporte estos
              procesos. La correcta gestión de los datos y la comunicación
              eficiente entre los departamentos permite la toma de decisiones
              basadas en evidencia y la ejecución de políticas sanitarias más
              efectivas. Como observa Chaffey (2011), "la estructura
              organizacional debe estar diseñada para apoyar la comunicación y
              el flujo de información, lo que es particularmente importante en
              organizaciones que dependen del uso de tecnologías" (p. 57).
            </p>

            <p>
              Además, la estructura organizacional también debe ser flexible
              para adaptarse a los cambios en el entorno sanitario, como los
              avances tecnológicos o las emergencias de salud pública, como lo
              evidenció la pandemia de COVID-19. En este contexto, la capacidad
              de las Secretarías de Salud para reconfigurar rápidamente sus
              áreas y asignar recursos de manera ágil puede marcar la diferencia
              en la gestión de crisis. Según Robbins y Coulter (2012), "una
              estructura organizativa rígida puede obstaculizar la capacidad de
              una institución para responder eficazmente a situaciones
              inesperadas" (p. 103), lo que subraya la necesidad de modelos
              organizativos flexibles y dinámicos.
            </p>

            <p>
              La secretaria de salud del Estado Falcón como departamento de
              gestión de recursos en el ámbito de salud en la región, cuenta con
              una estructura sistematizada para el control y flujo de la
              información, automatización de procesos y toma de decisiones, el
              área encargada para llevar a cabo estos procesos es el área de
              informática la cual posee una estructura distribuida en tres
              secciones: área de servidor, área de sistemas y área técnica.
            </p>

            <p>
              El área de servidores es una sección encargada de proveer la
              información de los recursos y los fondos del Estado, así como
              también la información de cada empleado público, las nóminas de
              los empleados se cargan a un sitio web llamado SISAP, este se
              encarga de administrar los fondos de los empleados. Los servidores
              están enlazados a la gobernación mediante un proxy a través de un
              enlace de fibra óptica de gobernación, cuentan con servicio de
              internet de una empresa privada que alimenta la parte directiva.
            </p>

            <p>
              El área de sistemas se encarga de administrar y gestionar la
              información propia de la organización mediante sistemas de
              información (SI) así como también desarrollar e implementar
              soluciones para mantener la integridad de los datos y el manejo
              correcto de la información usando software. Cuentan con un sistema
              de medicamentos (SISMED), que facilita el acceso y la
              administración de insumos médicos, esta se maneja en almacén y se
              encuentra en estado de prueba, por lo tanto, se encuentra en una
              versión beta y en constante actualización adecuación, esto en
              función de la calidad del software de la institución. En las demás
              áreas cuentan con software de ofimática para el trabajo
              administrativo.
            </p>
            <p>
              El área técnica se encarga del mantenimiento e instalación de la
              infraestructura TI de la organización, el sostenimiento correcto y
              preventivo a los equipos de diferentes oficinas como nomina,
              administración, egreso, entre otros. También de la instalación de
              nuevos equipos informáticos.
            </p>

            <p>
              Cada una de estas sub áreas poseen personal operativo y capacitado
              para llevar a cabo cada uno de los procesos correspondiente a sus
              áreas, capaces de dar respuestas a cualquier interrogante
              surgente.
            </p>

            <p>
              El gerente en la secretaria de salud en el estado falcón tiene la
              función de la supervisión del funcionamiento diario de las
              distintas áreas, entre ellas está el área de informática. El
              gerente se encarga de la administración del presupuesto y
              asignación eficiente de recursos tecnológicos, así como también la
              planificación de proyectos tecnológicos que alineen las soluciones
              con los objetivos de la organización, esto también va enlazado con
              la evaluación de riesgos, incluyendo vulnerabilidades de seguridad
              y posibles fallos que comprometan la integridad de los sistemas.
            </p>

            <p>
              Sin embargo, en la secretaria de salud se tiene en espera varios
              proyectos por falta de presupuesto, entre ellos están: sistemas de
              archivos para constancias de trabajo, sistemas para la
              organización de actividades entre empleados y sistema de egreso
              para personal capacitado, este último es el que se considera una
              prioridad debido a que la secretaria de salud es una organización
              gubernamental y dependen únicamente de un sistema de la
              gobernación (SISAP) los datos no cargan de forma íntegra en
              ocasiones por las múltiples peticiones que tiene el sistema a lo
              largo del país, lo cual una solución para la organización seria
              tener una base de datos propia de la organización la cual este
              desplegada en uno de sus servidores o en algún servicio de la
              nube, pero que pueda ser consumida por una aplicación cliente para
              su acceso óptimo.
            </p>

            <p>
              Esto nos lleva a una de las funciones esenciales del gerente
              dentro de la secretaria de salud el cual es la toma de decisiones,
              esta habilidad es relevante debido a que es la forma de guiar a la
              organización a decisiones estratégicas sobre la implementación de
              nuevas tecnologías, resolución de problemas técnicos y
              priorización de recursos.
            </p>

            <p>
              El área de informática desempeña un papel crucial en la mejora de
              la eficiencia y efectividad de los servicios de salud, ya que
              proporciona las herramientas y tecnologías necesarias para
              optimizar los procesos clínicos, administrativos y de gestión
              dentro de una institución sanitaria. En un entorno donde la
              demanda de servicios de salud crece constantemente y los recursos
              suelen ser limitados, la capacidad de utilizar tecnologías de la
              información de manera estratégica se ha vuelto indispensable para
              lograr un sistema de salud más ágil, eficaz y centrado en el
              paciente.
            </p>
            <p>
              El uso de la tecnología también se extiende a la gestión
              administrativa y financiera, donde el departamento de informática
              permite optimizar los recursos disponibles y mejorar la toma de
              decisiones gerenciales. Los sistemas de análisis de datos y los
              paneles de control integrados proporcionan a los administradores
              hospitalarios una visión clara del rendimiento de los diferentes
              departamentos, lo que facilita la identificación de cuellos de
              botella, la asignación eficiente de personal y el control de
              costos. Según Porter y Lee (2013), "la tecnología de la
              información no solo mejora los procesos clínicos, sino que también
              permite una administración más eficiente y el uso óptimo de los
              recursos, lo que se traduce en una reducción de costos sin
              comprometer la calidad del servicio" (p. 51).
            </p>

            <p>
              Asimismo, el departamento de informática es fundamental en la
              gestión de la información para la vigilancia epidemiológica y la
              toma de decisiones en salud pública. Los sistemas de información
              pueden analizar grandes volúmenes de datos en tiempo real,
              permitiendo a las autoridades de salud responder rápidamente ante
              emergencias sanitarias, como brotes de enfermedades infecciosas.
              Esto mejora la efectividad de las intervenciones, ya que permite
              una mejor planificación y ejecución de las medidas preventivas o
              de control. Según Yazdi et al. (2020), "la capacidad de los
              sistemas informáticos para manejar y analizar datos en tiempo real
              es crucial para la respuesta rápida a emergencias y para
              garantizar una salud pública más eficaz" (p. 196).
            </p>

            <h2>Recomendaciones:</h2>

            <ul>
              <li>
                Mejora de la infraestructura de red y conectividad: Dado que los
                servidores están enlazados a la gobernación mediante un proxy a
                través de fibra óptica, es esencial asegurar la redundancia de
                la conectividad. Se recomienda implementar en enlace de respaldo
                que permita mantener la conexión en caso de fallos en el
                servicio principal de la gobernación.
              </li>

              <li>
                Fortalecimiento del equipo de sistemas: Dado que el sistema
                SISMED aun esta en fase de prueba se recomienda una evaluación
                rigurosa del desempeño y funcionalidad del software para
                identificar áreas críticas que requieran adecuaciones. Es
                esencial involucrar tanto al equipo técnico como a los usuarios
                finales en esta evaluación para asegurar que las soluciones
                implementadas sean eficaces.
              </li>

              <li>
                Análisis de riesgos tecnológicos: Se recomienda realizar un
                análisis exhaustivo de los riesgos tecnológicos que enfrenta la
                infraestructura TI, especialmente en los relacionado con el
                almacenamiento y manejo de datos sensibles. A partir de este
                análisis, se deben implementar planes de contingencia que
                incluyan procesos de recuperación de datos ante desastres que
                comprometan la integridad de los datos, así como aplicar
                protocolos de seguridad confiables.
              </li>
            </ul>

            <h2>Videos:</h2>

            <div style={{ padding: "56.21% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1034356467?h=caf3a7e8b7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Secretaria de Salud del Estado Falcón - Podcast"
              ></iframe>
            </div>
            <Script src="https://player.vimeo.com/api/player.js" />
          </>
        }
        portada={undefined}
        autores={[
          "Ángel González",
          "Argenis Zarraga",
          "Erfran Romero",
          "José Ferrer",
          "José Prieto",
          "José Sánchez",
        ]}
      />
    ),
    thumbnail: {
      title:
        "Procesos Informáticos y Gerenciales en la Secretaria de Salud del Estado Falcón",
      previewImg: undefined,
    },
  },
  {
    id: 4,
    content: <Laberinto />,
    thumbnail: {
      title: "Laberinto",
      previewImg: undefined,
    },
  },
];

export default function Home() {
  return (
    <main className="h-screen font-sans">
      <Suspense>
        <Carousel slides={slides} areExternalSlides={false} />
      </Suspense>
    </main>
  );
}

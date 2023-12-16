import Header from "./components/Header.tsx";
import Card from "./components/Card.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import CardProvider from "@/postContext.tsx";
const App = () => {
  return (
    <CardProvider>
      <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
        <div className={"text-white bg-slate-950 h-[100%]"}>
          <Header />
          <Card />
        </div>
      </ThemeProvider>
    </CardProvider>
  );
};

export default App;

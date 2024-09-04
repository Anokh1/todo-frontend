import AppInlineMenu from "AppInlineMenu";
import AppMenu from "AppMenu";

const App = (props: any) => {
  return (
    <>
      <div>
        <AppMenu />
      </div>
      <AppInlineMenu />
    </>
  );
};

export default App;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import FestivalLanding from "./pages/festival-landing";
import Artists from "./pages/artists";
import Competition from "./pages/competition";

function Router() {
  return (
    <Switch>
      <Route path="/" component={FestivalLanding} />
      <Route path="/artists" component={Artists} />
      <Route path="/competition" component={Competition} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

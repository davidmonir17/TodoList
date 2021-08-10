
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import TODO from './components/todo/todolist';
import { Route, Switch } from 'react-router-dom';
import {BrowserRouter as Router} from'react-router-dom';
import Form from './components/form';
import DetailTodo from './components/detailesTodo';
import FormUp from './components/formUp';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHCMS,
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
    <ApolloProvider client={client}>
      {/* <Layout> */}
      
        
          <Switch>
          <Route exact path='/'  render={(props)=>(
            <TODO
            {...props}
            />
          )} />
          <Route exact path='/addtodo'  component={Form} />
          <Route exact path='/details'  component={DetailTodo} />
          <Route exact path='/update'  component={FormUp} />
          </Switch>
          
        {/* <TODO /> */}
        
      {/* </Layout> */}
    </ApolloProvider>
    </Router>
  );
}

export default App;

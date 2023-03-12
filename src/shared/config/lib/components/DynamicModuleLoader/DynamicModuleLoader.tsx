import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKyes, ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

type ReducerListEntries = [StateSchemaKyes, Reducer];

export type ReducerList = {
  [name in StateSchemaKyes]?: Reducer
}

interface DynamicModuleLoaderProps {
  reducerList: ReducerList,
  removeAfterUnmount: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducerList, removeAfterUnmount = true,
  } = props;
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducerList).forEach(([name, reducer]: ReducerListEntries) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} form reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducerList).forEach(([name, _reducer]: ReducerListEntries) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} form reducer` });
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

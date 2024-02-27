import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKyes, ReduxStoreWithManager, StateSchema } from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
  [name in StateSchemaKyes]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
  reducerList: ReducerList,
  removeAfterUnmount?: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducerList, removeAfterUnmount = true,
  } = props;
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();
    Object.entries(reducerList).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKyes];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKyes, reducer);
        dispatch({ type: `@INIT ${name} form reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducerList).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKyes);
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

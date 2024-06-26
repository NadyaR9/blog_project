import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from 'redux';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '../../i18n/i18nForTest';
// eslint-disable-next-line eslint-check-relative-path/layers-import
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line eslint-check-relative-path/layers-import
import '@/app/styles/index.scss';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}
interface TestProviderProps {
  children: ReactNode;
  options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
  const { options = {}, children } = props;
  const {
    route = '',
    initialState = {},
    asyncReducers,
    theme = Theme.DARK,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}

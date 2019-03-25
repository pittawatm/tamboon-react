import DataState from '../types/dataState'

const LOADING = "LOADING";
const ERROR = "ERROR";
const LOADED = "LOADED";

export function create<T>(data): DataState<T> {
  return {
    loading: false,
    data: data,
    error: null
  };
}

export function loading<T>(dataState: DataState<T>): DataState<T> {
  return {
    ...dataState,
    loading: true
  };
}

export function loaded<T>(dataState: DataState<T>, data?: T): DataState<T> {
  const newData = data != null ? data : dataState.data

  return {
    ...dataState,
    loading: false,
    data: newData
  };
}

export function failed<T>(dataState: DataState<T>, error: Error): DataState<T> {
  return {
    ...dataState,
    loading: false,
    error
  };
}

interface RenderState<T> {
  loading: (data?: T) => any;
  loaded: (data?: T) => any;
  error: (error?: Error) => any;
}

export function renderByState<T>(dataState: DataState<T>, renderState: RenderState<T>) {
  if (dataState.loading) {
    return renderState.loading(dataState.data);
  } else if (dataState.error != null) {
    return renderState.error(dataState.error);
  } else {
    return renderState.loaded(dataState.data);
  }
}
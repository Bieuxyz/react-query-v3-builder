import type {
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseMutationResult,
  UseQueryResult,
} from 'react-query'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type MutationOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn'
>

export function createMutationHookFactory<TData, TError, TVariables, TContext>(
  mutationFn: MutationFunction<TData, TVariables>,
  defaultOptionsCreator?:
    | MutationOptions<TData, TError, TVariables, TContext>
    | ((
        queryClient: QueryClient,
      ) => MutationOptions<TData, TError, TVariables, TContext>),
) {
  return function useCustomMutation(
    customOptions?: MutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient()

    const defaultOptions =
      typeof defaultOptionsCreator === 'function'
        ? defaultOptionsCreator(queryClient)
        : (defaultOptionsCreator ?? {})

    return useMutation<TData, TError, TVariables, TContext>(mutationFn, {
      ...defaultOptions,
      ...customOptions,
      onSuccess: (data, variables, context) => {
        defaultOptions?.onSuccess?.(data, variables, context)
        customOptions?.onSuccess?.(data, variables, context)
      },
      onError: (error, variables, context) => {
        defaultOptions?.onError?.(error, variables, context)
        customOptions?.onError?.(error, variables, context)
      },
      onMutate: async (variables) => {
        const defaultContext = await defaultOptions?.onMutate?.(variables)
        const customContext = await customOptions?.onMutate?.(variables)
        return { ...defaultContext, ...customContext } as TContext
      },
      onSettled: (data, error, variables, context) => {
        defaultOptions?.onSettled?.(data, error, variables, context)
        customOptions?.onSettled?.(data, error, variables, context)
      },
    })
  }
}

type QueryOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>

export function createQueryHook<TData, TError>(
  key: QueryKey,
  queryFn: QueryFunction<TData>,
  defaultOptionsCreator?:
    | QueryOptions<TData, TError>
    | ((queryClient: QueryClient) => QueryOptions<TData, TError>),
) {
  return function useCustomQuery(
    customOptions?: QueryOptions<TData, TError>,
  ): UseQueryResult<TData, TError> {
    const queryClient = useQueryClient()

    const defaultOptions =
      typeof defaultOptionsCreator === 'function'
        ? defaultOptionsCreator(queryClient)
        : (defaultOptionsCreator ?? {})

    return useQuery<TData, TError>(key, queryFn, {
      ...defaultOptions,
      ...customOptions,
      onSuccess: (data) => {
        defaultOptions?.onSuccess?.(data)
        customOptions?.onSuccess?.(data)
      },
      onError: (error) => {
        defaultOptions?.onError?.(error)
        customOptions?.onError?.(error)
      },
    })
  }
}

export function queryKeyBuilder<TFilter = unknown, TId = string | number>(
  name: string,
) {
  return {
    all: [name] as const,
    lists: () => [name, 'list'] as const,
    list: (filters?: TFilter) => [name, 'list', filters ?? {}] as const,
    details: () => [name, 'detail'] as const,
    detail: (id?: TId) => [name, 'detail', id] as const,
  }
}

import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import {RootState, store} from "app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const AppDispatch = () => useDispatch<AppDispatchType>()

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
	const dispatch = AppDispatch()
	return useMemo(() => {
		return bindActionCreators(actions, dispatch)
	}, [])
}

//types
export type AppDispatchType = typeof store.dispatch

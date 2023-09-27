export type ThemeState = {
    themeId: number
}
type ActionType = ReturnType<typeof changeThemeId>

const initState: ThemeState = {
    themeId: 1,
}

export const themeReducer = (state: ThemeState = initState, action: ActionType): ThemeState => {
    switch (action.type) {
        case 'SET_THEME_ID': {
            return {...state, themeId: action.id};
        }
        default:
            return state
    }
}

export const changeThemeId = (id: number) => ({type: 'SET_THEME_ID', id} as const)

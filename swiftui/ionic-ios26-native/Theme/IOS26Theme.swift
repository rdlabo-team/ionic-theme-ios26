import SwiftUI
extension Color {
    /// Light theme: rgb(255, 255, 255)
    static let ios26GlassBackground = Color(red: 255/255, green: 255/255, blue: 255/255)
    /// Light theme: rgb(220, 220, 220)
    static let ios26GlassBoxShadow = Color(red: 220/255, green: 220/255, blue: 220/255)
    /// Selected/primary text: rgb(16, 16, 16)
    static let ios26ButtonColorSelected = Color(red: 16/255, green: 16/255, blue: 16/255)

    /// Dark theme: rgb(62, 62, 62)
    static let ios26DarkGlassBackground = Color(red: 62/255, green: 62/255, blue: 62/255)
    /// Dark theme: rgb(68, 68, 68)
    static let ios26DarkGlassBorder = Color(red: 68/255, green: 68/255, blue: 68/255)
    /// Dark theme selected: rgb(255, 255, 255)
    static let ios26DarkButtonColorSelected = Color.white

    /// Content background (light) - #f2f2f7
    static let ios26ContentBackground = Color(red: 242/255, green: 242/255, blue: 247/255)
    /// Content background (dark)
    static let ios26DarkContentBackground = Color(red: 0/255, green: 0/255, blue: 0/255)
}

struct IOS26InsetListStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
    }
}

extension View {
    func ios26InsetList() -> some View {
        modifier(IOS26InsetListStyle())
    }
}

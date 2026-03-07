import SwiftUI

struct ComponentItem: Identifiable, Hashable {
    let id = UUID()
    let name: String
    var enable: Bool

    func hash(into hasher: inout Hasher) { hasher.combine(name) }
    static func == (lhs: ComponentItem, rhs: ComponentItem) -> Bool { lhs.name == rhs.name }
}

struct IndexView: View {
    @State private var components: [ComponentItem] = [
        ComponentItem(name: "accordion", enable: true),
        ComponentItem(name: "action-sheet", enable: true),
        ComponentItem(name: "alert", enable: true),
        ComponentItem(name: "breadcrumbs", enable: true),
        ComponentItem(name: "button", enable: true),
        ComponentItem(name: "card", enable: true),
        ComponentItem(name: "checkbox", enable: true),
        ComponentItem(name: "chip", enable: true),
        ComponentItem(name: "date-and-time-pickers", enable: true),
        ComponentItem(name: "floating-action-button", enable: true),
        ComponentItem(name: "inputs", enable: true),
        ComponentItem(name: "item-list", enable: true),
        ComponentItem(name: "modal", enable: true),
        ComponentItem(name: "popover", enable: true),
        ComponentItem(name: "progress-indicators", enable: true),
        ComponentItem(name: "radio", enable: true),
        ComponentItem(name: "range", enable: true),
        ComponentItem(name: "reorder", enable: true),
        ComponentItem(name: "searchbar", enable: true),
        ComponentItem(name: "segment", enable: true),
        ComponentItem(name: "select", enable: true),
        ComponentItem(name: "tabs", enable: true),
        ComponentItem(name: "toast", enable: true),
        ComponentItem(name: "toggle", enable: true),
        ComponentItem(name: "toolbar", enable: true),
    ]

    @AppStorage("isDarkMode") private var isDarkMode = false
    @Environment(\.colorScheme) private var systemColorScheme
    @Environment(\.openURL) private var openURL

    private var effectiveColorScheme: ColorScheme {
        isDarkMode ? .dark : systemColorScheme
    }

    private var enableComponents: [ComponentItem] {
        components.filter { $0.enable }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                backgroundColor
                    .ignoresSafeArea()

                List {
                    Section {
                        Toggle("Dark Mode", isOn: $isDarkMode)
                    } header: {
                        Text("Settings")
                    }

                    Section {
                        ForEach(enableComponents) { item in
                            NavigationLink(value: item) {
                                Text(item.name)
                            }
                        }
                    } header: {
                        Text("Components")
                    }
                }
                .ios26InsetList()
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Index")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    HStack(spacing: 12) {
                        Button {
                            openURL(URL(string: "https://github.com/rdlabo-team/ionic-theme-ios26")!)
                        } label: {
                            Image(systemName: "chevron.left.forwardslash.chevron.right")
                        }

                        Button {
                            openURL(URL(string: "https://ionicframework.com/")!)
                        } label: {
                            Image(systemName: "bolt.fill")
                        }
                    }
                }
            }
            .navigationDestination(for: ComponentItem.self) { item in
                ComponentDetailView(component: item)
            }
        }
        .preferredColorScheme(isDarkMode ? .dark : nil)
    }

    private var backgroundColor: Color {
        effectiveColorScheme == .dark ? .ios26DarkContentBackground : .ios26ContentBackground
    }
}

#Preview {
    IndexView()
}

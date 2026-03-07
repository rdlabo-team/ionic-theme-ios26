import SwiftUI

struct ComponentDetailView: View {
    let component: ComponentItem

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "square.grid.2x2")
                .font(.system(size: 64))
                .foregroundStyle(.secondary)
            Text(component.name)
                .font(.title2)
            Text("Component demo placeholder")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemGroupedBackground))
        .navigationTitle(component.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack {
        ComponentDetailView(component: ComponentItem(name: "button", enable: true))
    }
}
